import config from '../config'
import mongoose, { Mongoose, MongooseQueryMiddleware } from "mongoose";

class Db {
  constructor() { }

  init(): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await mongoose.connect(config.MONGODB_URL);
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
