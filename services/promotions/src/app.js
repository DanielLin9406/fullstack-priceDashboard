import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './schema/promotion';
import promotionsAPI from './routes/promotionsAPI';
import { saveData } from './migrations/seeds/seeds';
import { connectDb } from './db/mongo/mongoose';
import keys from './config/keys';

import logger from './middleware/logger';

const app = express();
const eraseDatabase = false;

app.use(bodyParser.json());
app.use(cors('*'));

app.use(`/${keys.authVer}`, promotionsAPI);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    logger.info(
      `Promotions API Service listening on port ${process.env.PORT}!`
    );
  });
});

export default app;
