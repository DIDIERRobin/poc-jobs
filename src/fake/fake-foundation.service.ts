import {maybeFail, randomBetween, sleep} from "./utils";
import {Injectable} from "@nestjs/common";

@Injectable()
export class FakeFoundationService {
    async updateFoundation(dossierId: string) {
        await sleep(randomBetween(300, 800));
        maybeFail(0.05, 'FOUNDATION_UPDATE_FAILED');
    }
}