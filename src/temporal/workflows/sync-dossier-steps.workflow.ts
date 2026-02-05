import { proxyActivities } from '@temporalio/workflow';
import type { FakeStepsActivities } from '../fake-step.activity';

const {
    fetchDn,
    mapDossier,
    uploadFiles,
    updateFoundation,
} = proxyActivities<FakeStepsActivities>({
    startToCloseTimeout: '2 minutes',
    retry: {
        initialInterval: '1s',
        backoffCoefficient: 2,
        maximumAttempts: 2,
    },
});

export async function syncDossierStepsWorkflow(
    dossierId: string,
): Promise<void> {
    await fetchDn(dossierId);
    await mapDossier(dossierId);
    await uploadFiles(dossierId);
    await updateFoundation(dossierId);
}