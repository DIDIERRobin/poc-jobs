import { Module } from '@nestjs/common';
import {FakeApiModule} from "./fake/fake-api.module";
import {RabbitModule} from "./rabbit/rabbit.module";
import {TemporalModule} from "./temporal/temporal.module";

@Module({
  imports: [
      FakeApiModule,
      RabbitModule,
      TemporalModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
