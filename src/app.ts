import config from './config'
import express from "express";
import * as http from "http";
import cors from "cors";

// Database
import db from './db/db';
// Controllers
import RecordController from './controllers/record.controller';
// Middlewares
import errorMiddleware from './middleware/error.middleware';


class App {
    app: express.Application;
    appRouter: express.Router;
    server: http.Server;
    port: string | number;
    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.server = new http.Server;
        this.appRouter = express.Router();
    }

    init() {
        return new Promise((resolve, reject) => {
            try {
                db.init();
                this.appConfig();
                this.initRoutes();
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            } finally {
                this.app.use(express.json());
                this.app.use(express.urlencoded({ extended: true }));
                this.app.use(errorMiddleware);
                resolve(true);
            }
        }).catch((err: Error) => {
            console.log(`Unable to launch application: ${err}`);
            process.exit(1);
        });
    }

    initRoutes() {
        this.app.use('/record', RecordController.router);
    }

    private appConfig() {
        this.app.use(cors());
        this.app.use(express.json({ limit: "5mb" }));
        this.app.use(express.urlencoded({ extended: false, limit: "5mb" }));
    }

    listen(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.server = http.createServer(this.app);
            this.server.on("error", (err: Error) => {
                reject(err);
                process.exit(2);
            });

            this.server.listen(config.PORT, () => {
                console.log("------------------------------------- ");
                console.log("[App] Started listening at port: " + config.PORT);
                resolve(true);
            });
        });
    }
}
const app = new App();
export default app;