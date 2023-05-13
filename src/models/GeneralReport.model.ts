import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { db } from '../server';

const ZGeneralReport = z.object({
    _id: z.instanceof(ObjectId).optional(),
    report: z.string(),
    date: z.date(),
    createdAt: z.number().nullable(),
    updatedAt: z.number().optional().nullable(),
});

export type TGeneralReport = z.infer<typeof ZGeneralReport>;

export const GeneralReport = db.collection<TGeneralReport>('reports');
