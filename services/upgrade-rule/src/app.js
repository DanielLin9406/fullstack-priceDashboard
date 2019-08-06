import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './model/upgradeRuleModel';
import upgradeRuleAPI from './routes/upgradeRuleAPI';
import { saveData } from './db/writeToDB';
import { connectDb } from './libs/mongoose/mongoose';

const app = express();
const eraseDatabase = false;

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', upgradeRuleAPI);

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    console.log(
      `UpgradeRule API Service listening on port ${process.env.PORT}!`
    );
  });
});

export default app;
