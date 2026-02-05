import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import {
    RABBIT_CONCURRENCY,
    RABBIT_DLQ,
    RABBIT_DLQ_ROUTING_KEY,
    RABBIT_EXCHANGE,
    RABBIT_QUEUE,
    RABBIT_ROUTING_KEY, RABBIT_URL,
} from './rabbit.constants';


@Injectable()
export class RabbitConnection implements OnModuleInit, OnModuleDestroy {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    getChannel(): amqp.Channel {
        return this.channel;
    }


    private readyResolve!: () => void;
    private readyPromise = new Promise<void>(resolve => {
        this.readyResolve = resolve;
    });

    async ready(): Promise<void> {
        return this.readyPromise;
    }

    async onModuleInit() {
        this.connection = await amqp.connect(RABBIT_URL);
        this.channel = await this.connection.createChannel();

        // équivalent du 8 sur BN
        await this.channel.prefetch(RABBIT_CONCURRENCY);

        // Exchange principal : direct => routingKey exacte
        await this.channel.assertExchange(RABBIT_EXCHANGE, 'direct', { durable: true });

        // DLQ : une queue qui reçoit les messages échoués
        await this.channel.assertQueue(RABBIT_DLQ, { durable: true });

        // bind dlq rooting key to dlq
        await this.channel.bindQueue(RABBIT_DLQ, RABBIT_EXCHANGE, RABBIT_DLQ_ROUTING_KEY);

        // Queue principale, avec dead-letter vers l’exchange
        await this.channel.assertQueue(RABBIT_QUEUE, {
            durable: true,
            arguments: {
                // Quand on reject/nack(requeue=false), Rabbit route vers cette DLQ routing key
                'x-dead-letter-exchange': RABBIT_EXCHANGE,
                'x-dead-letter-routing-key': RABBIT_DLQ_ROUTING_KEY,
            },
        });

        // bind rooting key to rabbit_queue rooting key
        await this.channel.bindQueue(RABBIT_QUEUE, RABBIT_EXCHANGE, RABBIT_ROUTING_KEY);

        console.log('[Rabbit] connected, topology ready (main queue + DLQ)');

        this.readyResolve();
    }

    async onModuleDestroy() {
        await this.channel?.close().catch(() => undefined);
        await this.connection?.close().catch(() => undefined);
    }
}