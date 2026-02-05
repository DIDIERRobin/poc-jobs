import { Controller, Post, Query } from '@nestjs/common';
import { RabbitProducer } from './rabbit.producer';

@Controller('rabbit')
export class RabbitController {
    constructor(private readonly producer: RabbitProducer) {}

    // POST /rabbit/enqueue?count=500
    @Post('enqueue')
    async enqueue(@Query('count') countStr?: string) {
        const count = Math.min(Number(countStr ?? 500) || 500, 5000);

        for (let i = 1; i <= count; i++) {
            await this.producer.enqueue(`Dossier-${i}`);
        }

        return { system: 'rabbit', enqueued: count };
    }
}