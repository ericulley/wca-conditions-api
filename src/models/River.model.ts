import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { db } from '../server';

export const ZRiver = z.object({
    _id: z.union([z.string(), z.instanceof(ObjectId).optional()]),
    name: z.string(),
    date: z.coerce.date().nullable().optional(),
    stationId: z.number().min(10000000),
    cfs: z.string().optional(),
    hatches: z.string(),
    report: z.string(),
    createdAt: z.number().optional().nullable(),
    updatedAt: z.number().optional().nullable(),
});

export type TRiver = z.infer<typeof ZRiver>;

export const River = db.collection<TRiver>('rivers');
