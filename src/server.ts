import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import log from './utils/logger';

const app = express();

// Connect to Mongo
mongoose
  .connect(config.mongo.url, { w: 'majority', retryWrites: true })
  .then(() => {
    log.info('connected to DB');
  })
  .catch((err) => {
    log.error(err);
  });

mongoose.set('strictQuery', true);

app.listen(() => {
  log.info('listenting on port: ' + config.server.port);
});
