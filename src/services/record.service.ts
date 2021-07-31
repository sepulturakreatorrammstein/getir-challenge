import { RequestRecordFilter } from "../dto/request_filter_records";
import { OperationCompleted } from "../helpers/http-response";
import recordRepository from "../repository/record.repository";


class RecordService {

    constructor() {
        console.log("RecordService started");
    }

    async getRecords(options: RequestRecordFilter): Promise<OperationCompleted> {
        return new Promise(async (resolve, reject) => {
            await recordRepository.getRecords(options)
                .then((result) => {
                    resolve(new OperationCompleted(undefined, result));
                })
                .catch((error) => {
                    console.log(error)
                    reject(error);
                });

        });
    };
}

const recordService = new RecordService();
export default recordService;