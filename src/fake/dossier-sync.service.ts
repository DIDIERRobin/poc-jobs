import {Injectable} from "@nestjs/common";
import {FakeDnService} from "./fake-dn.service";
import {FakeMapperService} from "./fake-mapper.service";
import {FakeUploadService} from "./fake-upload.service";
import {FakeFoundationService} from "./fake-foundation.service";

@Injectable()
export class DossierSyncService  {
    constructor(
        private readonly dn: FakeDnService,
        private readonly mapper: FakeMapperService,
        private readonly upload: FakeUploadService,
        private readonly foundation: FakeFoundationService,
    ) {}

    async syncOneDossier(dossierId: string): Promise<void> {
        console.log(`[${dossierId}] start sync`);

        const dossier = await this.dn.fetchDossier(dossierId);
        const mapped = await this.mapper.map(dossier);
        await this.upload.uploadFiles(mapped);
        await this.foundation.updateFoundation(dossierId);

        console.log(`[${dossierId}] sync OK`);
    }
}