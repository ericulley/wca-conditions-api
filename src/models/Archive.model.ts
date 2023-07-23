import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { db } from '../server';

export const ZArchive = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string(),
    stationId: z.number(),
    report: z.string(),
    date: z.string(),
    cfs: z.string().optional(),
    height: z.string().optional(),
    hatches: z.string(),
    archivedAt: z.number().optional().nullable(),
});

export type TArchive = z.infer<typeof ZArchive>;

export const BodyOfWater = db.collection<TArchive>('archive');
