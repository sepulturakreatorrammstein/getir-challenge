import config from '../config'
import mongoose, { Mongoose, MongooseQueryMiddleware } from "mongoose";

class Db {
  db: Mongoose
  constructor() { }

  init(): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        this.db = await mongoose.connect(config.MONGODB_URL);
        resolve(true);
      } catch (err) {
        console.log("Error on DB initialization; ", err);
        reject()
      }
    });
  }

};

const db = new Db();
export default db;
