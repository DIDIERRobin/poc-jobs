import { Module } from '@nestjs/common';
import {FakeApiModule} from "./fake/fake-api.module";

@Module({
  imports: [
      FakeApiModule
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
