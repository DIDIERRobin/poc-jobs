import { Worker } from '@temporalio/worker';
import { ModuleRef } from '@nestjs/core';
import path from 'path';
import { DossierSyncService } from '../fake/dossier-sync.service';
import { FakeDnService } from '../fake/fake-dn.service';
import { FakeMapperService } from '../fake/fake-mapper.service';
import { FakeUploadService } from '../fake/fake-upload.service';
import { FakeFoundationService } from '../fake/fake-foundation.service';
import { createDossierActivities } from './dossier.activity';
import { createFakeStepsActivities } from './fake-step.activity';

export async function startTemporalWorker(moduleRef: ModuleRef) {
    const dossierSyncService = moduleRef.get(DossierSyncService, { strict: false });
    const dn = moduleRef.get(FakeDnService, { strict: false });
    const mapper = moduleRef.get(FakeMapperService, { strict: false });
    const upload = moduleRef.get(FakeUploadService, { strict: false });
    const foundation = moduleRef.get(FakeFoundationService, { strict: false });

    if (!dossierSyncService || !dn || !mapper || !upload || !foundation) {
        throw new Error('[Temporal] One or more Fake services not found');
    }

    const worker = await Worker.create({
        taskQueue: 'raf-sync',

        workflowsPath: path.join(
            process.cwd(),
            'src/temporal/workflows/index.ts',
        ),

        activities: {
            ...createDossierActivities(dossierSyncService),
            ...createFakeStepsActivities(dn, mapper, upload, foundation),
        },
    });

    console.log('[Temporal] Worker started on taskQueue=raf-sync');

    await worker.run();
}