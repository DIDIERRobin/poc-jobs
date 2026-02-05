import { Module } from '@nestjs/common';
import { FakeApiModule } from '../fake/fake-api.module';
import { RabbitConnection } from './rabbit.connection';
import { RabbitProducer } from './rabbit.producer';
import { RabbitConsumer } from './rabbit.consumer';
import { RabbitController } from './rabbit.controller';

@Module({
    imports: [
        FakeApiModule,
    ],
    controllers: [RabbitController],
    providers: [
        RabbitConnection,
        RabbitProducer,
        RabbitConsumer,
    ],
})
export class RabbitModule {}