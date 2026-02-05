import { Module } from '@nestjs/common';
import {DossierSyncService} from "./dossier-sync.service";
import {FakeDnService} from "./fake-dn.service";
import {FakeFoundationService} from "./fake-foundation.service";
import {FakeMapperService} from "./fake-mapper.service";
import {FakeUploadService} from "./fake-upload.service";


@Module({
    imports: [],
    controllers: [],
    providers: [
        DossierSyncService,
        FakeDnService,
        FakeFoundationService,
        FakeMapperService,
        FakeUploadService,
    ],
    exports: [
        DossierSyncService,
        FakeDnService,
        FakeFoundationService,
        FakeMapperService,
        FakeUploadService,
    ]
})
export class FakeApiModule {}
