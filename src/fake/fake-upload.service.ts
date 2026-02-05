import {Injectable} from "@nestjs/common";
import {maybeFail, randomBetween, sleep} from "./utils";

@Injectable()
export class FakeUploadService {
    async uploadFiles(dossier: any) {
        for (let i = 0; i < dossier.files; i++) {
            await sleep(randomBetween(300, 1000));
            maybeFail(0.1, 'UPLOAD_FAILED');
        }
    }
}