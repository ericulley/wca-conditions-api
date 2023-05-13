import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { db } from '../server';

const ZRiver = z.object({
    _id: z.instanceof(ObjectId).optional(),
    report: z.string(),
    date: z.date(),
    createdAt: z.number().nullable(),
    updatedAt: z.number().optional().nullable(),
});

export type TRiver = z.infer<typeof ZRiver>;

export const River = db.collection<TRiver>('rivers');
