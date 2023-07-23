import express, { NextFunction, Request, Response } from 'express';
import { createArchiveEntry } from '../services/Archive.services';

// Rivers Router (e.g. {hostname}/rivers/...)
const archive = express.Router();

// Create An Archive Entry
archive.post('/', async (req: Request, res: Response, next: NextFunction) => {
    createArchiveEntry(req, res, next);
});

export default archive;
