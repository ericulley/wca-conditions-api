import express from 'express';
import mongoose from 'mongoose';
import { start } from 'repl';
import { config } from './config/config';
import log from './utils/logger';
import helmet from 'helmet';
import cors from 'cors';

// Import Controllers
import generalReportController from '../src/controllers/GeneralReport.controller';

// Instantiate App
const app = express();

// Connect to Mongo
mongoose
    .connect(config.mongo.url, {
        w: 'majority',
        retryWrites: true,
    })
    .then(() => {
        log.info('connected to DB');
        startServer();
    })
    .catch((err) => {
        log.error(err);
    });

// Start Server
const startServer = () => {
    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    // Routes
    app.use('/general', generalReportController);
    // Reports
    // Rivers
    // Lakes

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
