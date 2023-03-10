"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GeneralReport_model_1 = require("../models/GeneralReport.model");
// General Report Router (e.g. {hostname}/general/...)
const general = express_1.default.Router();
// Create a General Report
general.post('/reports', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete existing general reports
        const results = yield GeneralReport_model_1.GeneralReports.find({ _id: { $exists: true } });
        console.log('inside reports: ', results);
        if (results) {
            const deleted = yield GeneralReport_model_1.GeneralReports.deleteMany();
            console.log(deleted);
        }
        // Create new report
        const reqData = req.body;
        const newReport = yield GeneralReport_model_1.GeneralReports.insertOne(reqData);
        if (newReport) {
            res.status(200).send(newReport);
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Read a General Report
// general.get('/reports/:reportId', (req: Request, res: Response, next: NextFunction) => {
//     const generalReportId = req.params.reportId;
//     return GeneralReportModel.findById(generalReportId)
//         .then((report) => {
//             report ? res.status(200).send(report) : res.status(404).json({ message: 'Not found' });
//         })
//         .catch((error: Error) => {
//             console.error(error.message);
//         });
// });
// ReadAll General Reports
general.get('/reports/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield GeneralReport_model_1.GeneralReports.find({ _id: { $exists: true } }).toArray();
        console.log('reports: ', reports[0]);
        if (reports) {
            res.status(200).send(reports);
        }
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Update General Report
general.put('/reports/:reportId', (req, res, next) => {
    const generalReportId = req.params.reportId;
    // return GeneralReportModel.findById(generalReportId)
    //     .then((report) => {
    //         if (report) {
    //             report.set(req.body);
    //             return report
    //                 .save()
    //                 .then((updatedReport) => {
    //                     res.status(200).send(updatedReport);
    //                 })
    //                 .catch((error) => {
    //                     res.status(500).send({ error });
    //                 });
    //         } else {
    //             res.status(404).json({ message: 'Not found' });
    //         }
    //     })
    //     .catch((error: any) => {
    //         console.log(error.message);
    //     });
});
// Delete Genereal Report
// general.delete('/reports/:reportId', (req: Request, res: Response, next: NextFunction) => {
//     const generalReportId = req.params.reportId;
//     return GeneralReportModel.findByIdAndDelete(generalReportId)
//         .then((report) => {
//             report
//                 ? res.status(201).json({ message: 'Deleted' })
//                 : res.status(404).json({ message: 'Not found' });
//         })
//         .catch((error: any) => {
//             console.log(error.message);
//         });
// });
exports.default = general;
