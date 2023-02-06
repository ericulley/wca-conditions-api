import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import GeneralReportModel, { TGeneralReport } from '../models/GeneralReport.model';

// General Report Router (e.g. {hostname}/general/...)
const general = express.Router();

// Create a General Report
general.post('/reports', (req: Request, res: Response, next: NextFunction) => {
    const reqBody: TGeneralReport = req.body;
    const generalReport = new GeneralReportModel(reqBody);
    console.log('reqBody: ', reqBody);
    console.log('POST /general/report: ', generalReport);
    return generalReport
        .save()
        .then((report) => {
            res.status(200).send(report);
        })
        .catch((error) => {
            res.status(500).send({ error });
        });
});

// Read a General Report
general.get('/reports/:reportId', (req: Request, res: Response, next: NextFunction) => {
    const generalReportId = req.params.reportId;
    return GeneralReportModel.findById(generalReportId)
        .then((report) => {
            report ? res.status(200).send(report) : res.status(404).json({ message: 'Not found' });
        })
        .catch((error: Error) => {
            console.error(error.message);
        });
});

// ReadAll General Reports
general.get('/reports/', (req: Request, res: Response, next: NextFunction) => {
    GeneralReportModel.find()
        .then((reports) => {
            console.log('REPORTS: ', reports);
            res.status(200).send(reports);
        })
        .catch((error: any) => {
            console.log(error.message);
        });
});

// Update General Report
general.put('/reports/:reportId', (req: Request, res: Response, next: NextFunction) => {
    const generalReportId = req.params.reportId;
    return GeneralReportModel.findById(generalReportId)
        .then((report) => {
            if (report) {
                report.set(req.body);
                return report
                    .save()
                    .then((updatedReport) => {
                        res.status(200).send(updatedReport);
                    })
                    .catch((error) => {
                        res.status(500).send({ error });
                    });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error: any) => {
            console.log(error.message);
        });
});

// Delete Genereal Report
general.delete('/reports/:reportId', (req: Request, res: Response, next: NextFunction) => {
    const generalReportId = req.params.reportId;
    return GeneralReportModel.findByIdAndDelete(generalReportId)
        .then((report) => {
            report
                ? res.status(201).json({ message: 'Deleted' })
                : res.status(404).json({ message: 'Not found' });
        })
        .catch((error: any) => {
            console.log(error.message);
        });
});

export default general;
