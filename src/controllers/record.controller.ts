import express from 'express';
import * as schemas from '../validation/record.validation';
import recordService from '../services/record.service';
import { RequestRecordFilter } from '../dto/request_filter_records';
import { ValidationException } from '../helpers/http-exception';


class ChallengeController {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    async fetchRecords(req: express.Request, res: express.Response, next: express.NextFunction) {
        const { body } = req;
        await schemas.default.filter.validateAsync(body).then((validatedUser: RequestRecordFilter) => {
            recordService.getRecords(validatedUser)
                .then((result) => {
                    console.log("Fetched records successfully");
                    res.status(200).send(result);
                })
                .catch((error) => {
                    console.log(error);
                    next(error);
                });
        })
            .catch((error: any) => {
                console.log(error);
                next(new ValidationException(error))
            });
    };

    private initializeRoutes() {
        this.router.post('/', this.fetchRecords.bind(this));

    }
}

const newController = new ChallengeController();
export default newController;

