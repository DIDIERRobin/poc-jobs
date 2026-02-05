import { Injectable } from '@nestjs/common';
import { RabbitConnection } from './rabbit.connection';
import { RABBIT_EXCHANGE, RABBIT_ROUTING_KEY } from './rabbit.constants';

@Injectable()
export class RabbitProducer {
    constructor(private readonly rabbit: RabbitConnection) {}

    async enqueue(dossierId: string): Promise<void> {
        const channel = this.rabbit.getChannel();

        const payload = {
            dossierId,
            enqueuedAt: new Date().toISOString(),
        };

        channel.publish(
            RABBIT_EXCHANGE,
            RABBIT_ROUTING_KEY,
            Buffer.from(JSON.stringify(payload)),
            {
                persistent: true, // survivre à un restart Rabbit (si disque)
                contentType: 'application/json',
            },
        );

        console.log(`[Rabbit][Producer] enqueued dossierId=${dossierId}`);
    }
}