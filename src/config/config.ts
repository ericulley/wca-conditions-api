import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5050;
const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.v1ufhuf.mongodb.net/${MONGO_DATABASE}`;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_IDENTIFIER = process.env.AUTH0_IDENTIFIER || '';

export const config = {
    mongo: {
        url: MONGO_URL,
    },
    auth: {
        domain: AUTH0_DOMAIN,
        identifier: AUTH0_IDENTIFIER,
    },
    server: {
        port: PORT,
    },
};
