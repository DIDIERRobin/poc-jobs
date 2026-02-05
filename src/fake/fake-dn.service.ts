import {Injectable} from "@nestjs/common";
import {maybeFail, randomBetween, sleep} from "./utils";

@Injectable()
export class FakeDnService {
    async fetchDossier(dossierId: string) {
        await sleep(randomBetween(500, 2000));
        maybeFail(0.15, 'DN_TIMEOUT');
        return { dossierId, files: randomBetween(1, 3) };
    }
}