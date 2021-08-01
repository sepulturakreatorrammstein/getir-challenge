import dotenv from 'dotenv'

const result = dotenv.config();
if (result.error && process.env.NODE_ENV != undefined) {
  throw result.error
}

class Config {
  // Postgress
  public MONGODB_URL = process.env.MONGODB_URL || "";

  // Server
  public PORT = process.env.PORT || 5000;

}

const config = new Config();
export default config;