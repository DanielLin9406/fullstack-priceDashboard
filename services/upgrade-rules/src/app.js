import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './model/upgradeRuleModel';
import upgradeRuleAPI from './routes/upgradeRuleAPI';
import { saveData } from './db/seeds/seeds';
import { connectDb } from './libs/mongoose/mongoose';
import keys from './config/keys';

import logger from './libs/logger';

const app = express();
const eraseDatabase = false;

app.use(bodyParser.json());
app.use(cors('*'));

app.use(`/${keys.authVer}`, upgradeRuleAPI);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    logger.info(
      `UpgradeRule API Service listening on port ${process.env.PORT}!`
    );
  });
});

export default app;
