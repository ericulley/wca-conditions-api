import express, { NextFunction, Request, Response } from 'express';
import { ObjectId, UpdateResult } from 'mongodb';
import { River, TRiver } from '../models/River.model';
import log from '../utils/logger';

// General Report Router (e.g. {hostname}/general/...)
const rivers = express.Router();

// Create and Archive a General Report
rivers.post('/rivers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqData = req.body as TRiver;
        if (!reqData.createdAt) reqData.createdAt = Date.now();
        if (!reqData.updatedAt) reqData.updatedAt = undefined;
        const record = await River.insertOne(reqData);
        if (record) {
            res.status(200).send(record);
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// Get a General Report
rivers.get('/rivers/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const RiverId = req.params.reportId;
        const record = await River.findOne({ _id: new ObjectId(RiverId) });
        if (record) {
            res.status(200).send(record);
        } else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// Get All General Reports
rivers.get('/rivers/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await River.find({ _id: { $exists: true } }, { limit: 20 }).toArray();
        if (records) {
            res.status(200).send(records);
        } else if (!records) {
            res.status(400).json({ message: 'Records Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// Update General Report
rivers.put('/rivers/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqData = req.body as TRiver;
        const RiverId = req.params.reportId;
        const record: UpdateResult = await River.updateOne(
            { _id: new ObjectId(RiverId) },
            {
                $set: {
                    report: reqData.report,
                    date: reqData.date,
                    updatedAt: Date.now(),
                },
            }
        );
        if (record.acknowledged && record.matchedCount > 0) {
            res.status(200).send(record);
        }
        if (record.acknowledged && record.matchedCount == 0) {
            res.status(400).json({ message: 'Record Not Found' });
        } else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

// Delete Genereal Report
rivers.delete('/rivers/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const RiverId = req.params.reportId;
        const deletedRecord = await River.deleteOne({
            _id: new ObjectId(RiverId),
        });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount > 0)
            res.status(201).json({ message: 'Record Deleted' });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount == 0)
            res.status(400).json({ message: 'Record Not Found' });
        if (!deletedRecord.acknowledged) res.status(400).json({ message: 'Bad Request' });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default rivers;
