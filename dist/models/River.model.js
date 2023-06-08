"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.River = exports.ZRiver = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
const server_1 = require("../server");
exports.ZRiver = zod_1.z.object({
    _id: zod_1.z.instanceof(mongodb_1.ObjectId).optional(),
    name: zod_1.z.string(),
    date: zod_1.z.string(),
    stationId: zod_1.z.number(),
    cfs: zod_1.z.string().optional(),
    hatches: zod_1.z.string(),
    report: zod_1.z.string(),
    createdAt: zod_1.z.number().optional().nullable(),
    updatedAt: zod_1.z.number().optional().nullable(),
});
exports.River = server_1.db.collection('rivers');
