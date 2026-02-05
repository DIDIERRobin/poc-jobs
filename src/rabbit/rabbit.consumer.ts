import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitConnection } from './rabbit.connection';
import { RABBIT_QUEUE } from './rabbit.constants';
import { DossierSyncService } from '../fake/dossier-sync.service';

@Injectable()
export class RabbitConsumer implements OnModuleInit {
    constructor(
        private readonly rabbit: RabbitConnection,
        private readonly dossierSync: DossierSyncService,
    ) {}

    async onModuleInit() {
        await this.rabbit.ready();
        const channel = this.rabbit.getChannel();

        await channel.consume(
            RABBIT_QUEUE,
            async msg => {
                if (!msg) return;

                const raw = msg.content.toString('utf-8');
                let dossierId = 'unknown';

                try {
                    const payload = JSON.parse(raw);
                    dossierId = payload?.dossierId;

                    console.log(`[Rabbit][Consumer] start dossierId=${dossierId}`);

                    // Rabbit basic : on traite le dossier en un bloc
                    await this.dossierSync.syncOneDossier(dossierId);

                    channel.ack(msg);
                    console.log(`[Rabbit][Consumer] ack dossierId=${dossierId}`);
                } catch (err) {
                    const message = err instanceof Error ? err.message : String(err);
                    console.error(`[Rabbit][Consumer] FAIL dossierId=${dossierId} err=${message}`);

                    // Rabbit basic : démonstration DLQ (pas de retry intelligent)
                    channel.nack(msg, false, false);
                }
            },
            { noAck: false },
        );

        console.log('[Rabbit][Consumer] consuming main queue');
    }
}