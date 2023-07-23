import express, { NextFunction, Request, Response } from 'express';

// Rivers Router (e.g. {hostname}/rivers/...)
const archive = express.Router();

// Create A River
archive.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Archive Route Triggered');
});

export default archive;
