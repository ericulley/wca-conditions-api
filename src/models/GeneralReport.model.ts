import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

const ZGeneralReport = z.object({
    _id: z.number().optional(),
    name: z.string(),
    report: z.string(),
    hatches: z.string(),
    flies: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type TGeneralReport = z.infer<typeof ZGeneralReport>;

const GeneralReportMongooseSchema = new mongoose.Schema<TGeneralReport, Document>({
    name: String,
    report: String,
    hatches: String,
    flies: String,
    createdAt: String,
    updatedAt: String,
});

// export interface IReportModel extends IReport, Document {}
const GeneralReportSchema: Schema = new Schema(GeneralReportMongooseSchema, { versionKey: false });

const GeneralReport = mongoose.model<TGeneralReport>('Report', GeneralReportSchema);
export default GeneralReport;
