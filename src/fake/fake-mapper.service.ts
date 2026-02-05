import {maybeFail, randomBetween, sleep} from "./utils";
import {Injectable} from "@nestjs/common";

@Injectable()
export class FakeMapperService {
    async map(dossier: any) {
        await sleep(randomBetween(300, 1500));
        maybeFail(0.5, 'MAPPER_INVALID_DOSSIER');
        return dossier;
    }
}