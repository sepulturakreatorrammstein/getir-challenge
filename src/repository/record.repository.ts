import { Schema, model, Model } from "mongoose";
import { IRecord } from '../db/models/record';
import { RequestRecordFilter } from '../dto/request_filter_records';
import db from "../db/db";
import utilsService from '../helpers/utils';
import { DatabaseErrorException, GenericException, NoRecordFound } from '../helpers/http-exception';


class RecordRepository {
    db: typeof db;
    constructor() {
        this.db = db;
    }

    recordSchema = new Schema<IRecord>({
        key: { type: String, required: true },
        createdAt: { type: Date, required: true },
        totalCount: { type: Number, required: true }
    });

    record: Model<IRecord> = model('Record', this.recordSchema);

    async getRecords(options: RequestRecordFilter): Promise<IRecord[]> {
        return new Promise(async (resolve, reject) => {
            let countFilteredDocs;
            try {
                let docs;
                docs = await this.record.find({
                    $and: [
                        { createdAt: { $gte: new Date(options.startDate) } },
                        { createdAt: { $lte: new Date(options.endDate) } },
                    ],
                }).lean().exec();
                countFilteredDocs = utilsService.countCalculateFilter(
                    docs,
                    options.minCount,
                    options.maxCount
                );
                if (countFilteredDocs.stack) {
                    reject(new NoRecordFound());
                } else {
                    resolve(countFilteredDocs)
                }
            } catch (err) {
                console.error(err);
                reject(new DatabaseErrorException());
            }
        });
    }

}

const recordRepository = new RecordRepository();
export default recordRepository;