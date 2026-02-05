import { Controller, Post, Query } from '@nestjs/common';
import {Client, Connection} from '@temporalio/client';

@Controller('temporal')
export class TemporalController {
    private client!: Client;

    private async init() {
        const connection = await Connection.connect({
            address: 'localhost:7233',
        });

        this.client = new Client({ connection });
    }

    constructor() {
        this.init().catch(err => {
            console.error('[Temporal] client init failed', err);
        });
    }

    @Post('enqueue')
    async enqueue(@Query('count') countStr?: string) {
        const count = Math.min(Number(countStr ?? 10) || 10, 100);

        for (let i = 1; i <= count; i++) {
            const dossierId = `Dossier-${i}`;

            await this.client.workflow.start('syncDossierWorkflow', {
                args: [dossierId],
                taskQueue: 'raf-sync',
                workflowId: `sync-${dossierId}`,
            });
        }

        return { system: 'temporal', enqueued: count };
    }

    @Post('enqueue-steps')
    async enqueueSteps(@Query('count') countStr?: string) {
        const count = Math.min(Number(countStr ?? 10) || 10, 50);

        for (let i = 1; i <= count; i++) {
            const dossierId = `Dossier-${i}`;

            await this.client.workflow.start('syncDossierStepsWorkflow', {
                args: [dossierId],
                taskQueue: 'raf-sync',
                workflowId: `sync-steps-${dossierId}`,
            });
        }

        return { system: 'temporal', mode: 'steps', enqueued: count };
    }
}