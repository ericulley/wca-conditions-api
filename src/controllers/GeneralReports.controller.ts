import express, { NextFunction, Request, Response } from 'express';
import { ObjectId, UpdateResult } from 'mongodb';
import { GeneralReport, TGeneralReport } from '../models/GeneralReport.model';
import { createGeneralReport, readAllGeneralReport } from '../services/GeneralReport.services';
import log from '../utils/logger';

// General Report Router (e.g. {hostname}/general/...)
const reports = express.Router();

// Create a General Report
reports.post('/reports', async (req: Request, res: Response, next: NextFunction) => {
    createGeneralReport(req, res, next);
});

// Get All General Reports
reports.get('/reports/', async (req: Request, res: Response, next: NextFunction) => {
    readAllGeneralReport(req, res, next);
});

// Get Most Recent General Report
reports.get('/reports/latest', async (req: Request, res: Response, next: NextFunction) => {
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
});

// Get a General Report
reports.get('/reports/:reportId', async (req: Request, res: Response, next: NextFunction) => {
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
});

// Update General Report
reports.put('/reports/:reportId', async (req: Request, res: Response, next: NextFunction) => {
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
});

// Delete Genereal Report
reports.delete('/reports/:reportId', async (req: Request, res: Response, next: NextFunction) => {
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
});

export default reports;
