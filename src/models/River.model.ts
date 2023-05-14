import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { db } from '../server';

const ZRiver = z.object({
    _id: z.instanceof(ObjectId).optional(),
    date: z.date(),
    name: z.string(),
    station_id: z.number(),
    hatches: z.string().optional(),
    report: z.string(),
    createdAt: z.number().nullable(),
    updatedAt: z.number().optional().nullable(),
});

export type TRiver = z.infer<typeof ZRiver>;

export const River = db.collection<TRiver>('rivers');
