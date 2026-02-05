import {DossierSyncService} from "../fake/dossier-sync.service";

export interface DossierActivities {
    syncDossier(dossierId: string): Promise<void>;
}

// on injecte DossierSyncService depuis Nest
export function createDossierActivities(
    dossierSyncService: DossierSyncService,
): DossierActivities {
    return {
        async syncDossier(dossierId: string): Promise<void> {
            console.log(`[Temporal][Activity] start dossier ${dossierId}`);
            await dossierSyncService.syncOneDossier(dossierId);
            console.log(`[Temporal][Activity] done dossier ${dossierId}`);
        },
    };
}