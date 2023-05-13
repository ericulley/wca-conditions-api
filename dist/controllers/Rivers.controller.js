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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const River_model_1 = require("../models/River.model");
// General Report Router (e.g. {hostname}/general/...)
const rivers = express_1.default.Router();
// Create and Archive a General Report
rivers.post('/rivers', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        if (!reqData.createdAt)
            reqData.createdAt = Date.now();
        if (!reqData.updatedAt)
            reqData.updatedAt = undefined;
        const record = yield River_model_1.River.insertOne(reqData);
        if (record) {
            res.status(200).send(record);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Get a General Report
rivers.get('/rivers/:reportId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const RiverId = req.params.reportId;
        const record = yield River_model_1.River.findOne({ _id: new mongodb_1.ObjectId(RiverId) });
        if (record) {
            res.status(200).send(record);
        }
        else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Get All General Reports
rivers.get('/rivers/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield River_model_1.River.find({ _id: { $exists: true } }, { limit: 20 }).toArray();
        if (records) {
            res.status(200).send(records);
        }
        else if (!records) {
            res.status(400).json({ message: 'Records Not Found' });
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Update General Report
rivers.put('/rivers/:reportId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        const RiverId = req.params.reportId;
        const record = yield River_model_1.River.updateOne({ _id: new mongodb_1.ObjectId(RiverId) }, {
            $set: {
                report: reqData.report,
                date: reqData.date,
                updatedAt: Date.now(),
            },
        });
        if (record.acknowledged && record.matchedCount > 0) {
            res.status(200).send(record);
        }
        if (record.acknowledged && record.matchedCount == 0) {
            res.status(400).json({ message: 'Record Not Found' });
        }
        else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Delete Genereal Report
rivers.delete('/rivers/:reportId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const RiverId = req.params.reportId;
        const deletedRecord = yield River_model_1.River.deleteOne({
            _id: new mongodb_1.ObjectId(RiverId),
        });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount > 0)
            res.status(201).json({ message: 'Record Deleted' });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount == 0)
            res.status(400).json({ message: 'Record Not Found' });
        if (!deletedRecord.acknowledged)
            res.status(400).json({ message: 'Bad Request' });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
exports.default = rivers;