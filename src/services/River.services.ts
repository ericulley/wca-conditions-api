import express, { NextFunction, Request, Response } from 'express';
import { ObjectId, UpdateResult } from 'mongodb';
import { River, TRiver, ZRiver } from '../models/River.model';

// Create A River
export const createRiver = async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

// Read A River
export const readRiver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const RiverId = req.params.reportId;
        const record = await River.findOne({ _id: new ObjectId(RiverId) });
        if (record) {
            res.status(200).send(record);
        } else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

// ReadAll Rivers
export const readAllRivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await River.find({ _id: { $exists: true } }, { limit: 10 }).toArray();
        if (records) {
            console.log('Records: ', records);
            res.status(200).send(records);
        } else if (!records) {
            res.status(400).json({ message: 'Records Not Found' });
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

// Update A River
export const updateRiver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqData = req.body as TRiver;
        reqData._id = reqData._id as ObjectId;
        console.log('typeof: ', typeof reqData._id);
        const riverId = req.params.reportId as string;
        console.log('Update A River: ', reqData);
        if (!ZRiver.safeParse(reqData).success) {
            console.log('Parse: ', ZRiver.safeParse(reqData));
            return res.status(400).json({
                error: 'Bad Request',
                error_message: 'Missing required properties',
            });
        } else {
            const record: UpdateResult = await River.updateOne(
                { _id: new ObjectId(riverId) },
                {
                    $set: {
                        name: reqData.name,
                        date: reqData.date,
                        hatches: reqData.hatches,
                        report: reqData.report,
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
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
};

// Delete A River
export const deleteRiver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const riverId = req.params.riverId;
        const deletedRecord = await River.deleteOne({
            _id: new ObjectId(riverId),
        });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount > 0)
            res.status(201).json({ message: 'Record Deleted' });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount == 0)
            res.status(400).json({ message: 'Record Not Found' });
        if (!deletedRecord.acknowledged) res.status(400).json({ message: 'Bad Request' });
    } catch (error) {
        res.status(500).send({ error: error });
    }
};
