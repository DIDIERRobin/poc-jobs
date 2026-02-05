import { proxyActivities } from '@temporalio/workflow';
import type { DossierActivities } from '../dossier.activity';

// Le workflow NE FAIT QUE décrire l’ordre des choses
const { syncDossier } = proxyActivities<DossierActivities>({
    startToCloseTimeout: '5 minutes',
    retry: {
        maximumAttempts: 1
    }
});

export async function syncDossierWorkflow(dossierId: string): Promise<void> {
    // 1 dossier = 1 activity dans la version simple
    await syncDossier(dossierId);
}
