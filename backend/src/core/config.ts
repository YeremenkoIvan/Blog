import dotenv from "dotenv";

dotenv.config();

const config = {
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 8000,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
};

export default config;
