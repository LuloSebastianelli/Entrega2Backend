import dotenv from "dotenv";

dotenv.config();


export default {
    PORT: process.env.PORT || 8000,
    URL_MONGO: process.env.URL_MONGO,
    FIRMA_COOKIE: process.env.FIRMA_COOKIE,
    JWT_PRIVATE_KEY: process.env.PRIVATE_KEY,
    JWT_EXPIRES_TIME_TOKEN: process.env.EXPIRES_TIME_TOKEN
}
