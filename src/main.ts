import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DossierSyncService} from "./fake/dossier-sync.service";
import {startTemporalWorker} from "./temporal/worker";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TEMPORAL
  const dossierSync = app.get(DossierSyncService);
  startTemporalWorker(dossierSync).catch(err => {
    console.error('Temporal worker failed', err);
    process.exit(1);
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
