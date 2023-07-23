import { NextFunction, Request, Response } from 'express';
import { Archive, TArchive } from '../models/Archive.model';

// Create An Archive Entry
export const createArchiveEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Create Archive Entry Triggered');
        const reqData = req.body as TArchive;
        console.log('Request Body: ', req.body);
        const record = await Archive.insertOne(req.body);
        if (record) {
            res.status(200).send(record);
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
};
