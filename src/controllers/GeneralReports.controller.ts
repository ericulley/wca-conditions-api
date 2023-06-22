import express, { NextFunction, Request, Response } from 'express';
import {
    createGeneralReport,
    deleteGeneralReport,
    readAGeneralReport,
    readAllGeneralReport,
    readLatestGeneralReport,
    updateGeneralReport,
} from '../services/GeneralReport.services';
import checkJwt from '../utils/auth';

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

// Get Latest General Report
reports.get('/reports/latest', async (req: Request, res: Response, next: NextFunction) => {
    readLatestGeneralReport(req, res, next);
});

// Get A General Report
reports.get('/reports/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    readAGeneralReport(req, res, next);
});

// Update General Report
reports.put('/reports/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    updateGeneralReport(req, res, next);
});

// Delete Genereal Report
reports.delete(
    '/reports/:reportId',
    checkJwt,
    async (req: Request, res: Response, next: NextFunction) => {
        deleteGeneralReport(req, res, next);
    }
);

export default reports;
