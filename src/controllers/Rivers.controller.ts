import express, { NextFunction, Request, Response } from 'express';
import {
    createRiver,
    deleteRiver,
    readAllRivers,
    readRiver,
    updateRiver,
} from '../services/River.services';

// Rivers Router (e.g. {hostname}/rivers/...)
const rivers = express.Router();

// Create A River
rivers.post('/', async (req: Request, res: Response, next: NextFunction) => {
    createRiver(req, res, next);
});

// Get A River
rivers.get('/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    readRiver(req, res, next);
});

// Get All Rivers
rivers.get('/', async (req: Request, res: Response, next: NextFunction) => {
    readAllRivers(req, res, next);
});

// Update A River
rivers.put('/:reportId', async (req: Request, res: Response, next: NextFunction) => {
    updateRiver(req, res, next);
});

// Delete A River
rivers.delete('/:riverId', async (req: Request, res: Response, next: NextFunction) => {
    deleteRiver(req, res, next);
});

export default rivers;
