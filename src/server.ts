import express from 'express';
import { config } from './config/config';
import { MongoClient, MongoError } from 'mongodb';
import log from './utils/logger';
import helmet from 'helmet';
import cors from 'cors';

// Instantiate App
const app = express();

// Configure DB
export const mongoClient = new MongoClient(config.mongo.url);
export const db = mongoClient.db();
const connectDB = async () => {
    try {
        await mongoClient.connect();
        log.info('connected to db');
    } catch (error: any) {
        await mongoClient.close();
        log.error(error.message);
    }
};

// Import Controllers
import reports from './controllers/GeneralReports.controller';
import rivers from './controllers/Rivers.controller';
import archive from './controllers/Archive.controller';
import checkJwt from './utils/auth';

// Start Server
const startServer = async () => {
    // Connect to DB
    await connectDB();

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    /********
     * Routes
     *********/
    // Reports
    app.use('/general', reports);
    // Rivers
    app.use('/rivers', rivers);
    // Lakes

    // Archive
    app.use('/archive', archive);

    //Health Check & Default Route
    app.get('/', (req, res, next) => {
        res.status(200).json('OK');
    });

    // Start Server
    const port = config.server.port;
    app.listen(port, () => {
        log.info('listenting on port: ' + port);
    });
};

startServer();
