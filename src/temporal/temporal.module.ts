import { Module, OnModuleInit } from '@nestjs/common';
import { TemporalController } from './temporal.controller';
import { startTemporalWorker } from './worker';
import { ModuleRef } from '@nestjs/core';

@Module({
    controllers: [TemporalController],
})
export class TemporalModule implements OnModuleInit {
    constructor(private readonly moduleRef: ModuleRef) {}

    async onModuleInit() {
        startTemporalWorker(this.moduleRef).catch(err => {
            console.error('[Temporal] Worker crashed', err);
        });
    }
}