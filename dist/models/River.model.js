"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.River = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
const server_1 = require("../server");
const ZRiver = zod_1.z.object({
    _id: zod_1.z.instanceof(mongodb_1.ObjectId).optional(),
    date: zod_1.z.date(),
    name: zod_1.z.string(),
    station_id: zod_1.z.number(),
    hatches: zod_1.z.string().optional(),
    report: zod_1.z.string(),
    createdAt: zod_1.z.number().nullable(),
    updatedAt: zod_1.z.number().optional().nullable(),
});
exports.River = server_1.db.collection('rivers');
