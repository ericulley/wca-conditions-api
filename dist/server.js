"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.mongoClient = void 0;
const express_1 = __importDefault(require("express"));
// import { db } from './db';
const config_1 = require("./config/config");
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("./utils/logger"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// Instantiate App
const app = (0, express_1.default)();
// Configure DB
exports.mongoClient = new mongodb_1.MongoClient(config_1.config.mongo.url);
exports.db = exports.mongoClient.db();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.mongoClient.connect();
        logger_1.default.info('connected to db');
    }
    catch (error) {
        yield exports.mongoClient.close();
        logger_1.default.error(error.message);
    }
});
// Import Controllers
const GeneralReports_controller_1 = __importDefault(require("./controllers/GeneralReports.controller"));
const Rivers_controller_1 = __importDefault(require("./controllers/Rivers.controller"));
// Start Server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect to DB
    yield connectDB();
    // Middleware
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    // Routes
    app.use('/general', GeneralReports_controller_1.default);
    // Reports
    // Rivers
    app.use('/rivers', Rivers_controller_1.default);
    // Lakes
    //Health Check & Default Route
    app.get('/', (req, res, next) => {
        res.status(200).json('OK');
    });
    // Start Server
    const port = config_1.config.server.port;
    app.listen(port, () => {
        logger_1.default.info('listenting on port: ' + port);
    });
});
startServer();
