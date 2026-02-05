import { FakeDnService } from '../fake/fake-dn.service';
import { FakeMapperService } from '../fake/fake-mapper.service';
import { FakeUploadService } from '../fake/fake-upload.service';
import { FakeFoundationService } from '../fake/fake-foundation.service';

export interface FakeStepsActivities {
    fetchDn(dossierId: string): Promise<void>;
    mapDossier(dossierId: string): Promise<void>;
    uploadFiles(dossierId: string): Promise<void>;
    updateFoundation(dossierId: string): Promise<void>;
}

export function createFakeStepsActivities(
    dn: FakeDnService,
    mapper: FakeMapperService,
    upload: FakeUploadService,
    foundation: FakeFoundationService,
): FakeStepsActivities {
    return {
        async fetchDn(dossierId: string) {
            console.log(`[Temporal][DN] ${dossierId}`);
            await dn.fetchDossier(dossierId);
        },

        async mapDossier(dossierId: string) {
            console.log(`[Temporal][Mapper] ${dossierId}`);
            await mapper.map(dossierId);
        },

        async uploadFiles(dossierId: string) {
            console.log(`[Temporal][Upload] ${dossierId}`);
            await upload.uploadFiles(dossierId);
        },

        async updateFoundation(dossierId: string) {
            console.log(`[Temporal][Foundation] ${dossierId}`);
            await foundation.updateFoundation(dossierId);
        },
    };
}