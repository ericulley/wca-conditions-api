import { NextFunction, Request, Response } from 'express';
import { ObjectId, UpdateResult } from 'mongodb';
import { GeneralReport, TGeneralReport } from '../models/GeneralReport.model';

// Create General Report
export const createGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqData = req.body as TGeneralReport;
        if (!reqData.createdAt) reqData.createdAt = Date.now();
        if (!reqData.updatedAt) reqData.updatedAt = undefined;
        const record = await GeneralReport.insertOne(reqData);
        if (record) {
            res.status(200).send(record);
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

// Read All General Reports
export const readAllGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await GeneralReport.find(
            { _id: { $exists: true } },
            { limit: 20 }
        ).toArray();
        if (records) {
            res.status(200).send(records);
        } else if (!records) {
            res.status(400).json({ message: 'Records Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

// Read Latest General Report
export const readLatestGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const record = await GeneralReport.findOne({}, { sort: { createdAt: -1 } });
        if (record) {
            res.status(200).send(record);
        } else if (!record) {
            res.status(400).json({ message: 'Records Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

// Read A General Report
export const readAGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generalReportId = req.params.reportId;
        const record = await GeneralReport.findOne({ _id: new ObjectId(generalReportId) });
        if (record) {
            res.status(200).send(record);
        } else if (!record) {
            res.status(400).json({ message: 'Record Not Found' });
        }
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};

// Update General Report
export const updateGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqData = req.body as TGeneralReport;
        const generalReportId = req.params.reportId;
        const record: UpdateResult = await GeneralReport.updateOne(
            { _id: new ObjectId(generalReportId) },
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
};

// Delete General Report
export const deleteGeneralReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const generalReportId = req.params.reportId;
        const deletedRecord = await GeneralReport.deleteOne({
            _id: new ObjectId(generalReportId),
        });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount > 0)
            res.status(201).json({ message: 'Record Deleted' });
        if (deletedRecord.acknowledged && deletedRecord.deletedCount == 0)
            res.status(400).json({ message: 'Record Not Found' });
        if (!deletedRecord.acknowledged) res.status(400).json({ message: 'Bad Request' });
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
};
