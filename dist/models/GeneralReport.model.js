"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralReports = void 0;
const zod_1 = require("zod");
const server_1 = require("../server");
const ZGeneralReport = zod_1.z.object({
    _id: zod_1.z.number().optional(),
    report: zod_1.z.string(),
    date: zod_1.z.date(),
    createdAt: zod_1.z.number().optional(),
    updatedAt: zod_1.z.number().optional(),
});
exports.GeneralReports = server_1.db.collection('reports');
