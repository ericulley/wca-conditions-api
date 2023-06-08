import express, { NextFunction, Request, Response } from 'express';
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

// Read General Report
export const readGeneralReport = async (req: Request, res: Response, next: NextFunction) => {};

// ReadAll General Reports
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

// Update General Report
export const updateGeneralReport = async (req: Request, res: Response, next: NextFunction) => {};

// Delete General Report
export const deleteGeneralReport = async (req: Request, res: Response, next: NextFunction) => {};
