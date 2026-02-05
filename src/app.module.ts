import { Module } from '@nestjs/common';
import {FakeApiModule} from "./fake/fake-api.module";
import {RabbitModule} from "./rabbit/rabbit.module";

@Module({
  imports: [
      FakeApiModule,
      RabbitModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
