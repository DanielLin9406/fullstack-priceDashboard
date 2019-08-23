import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './model/pricesModel';
import pricesAPI from './routes/pricesAPI';
import { saveData } from './db/seeds/seeds';
import { connectDb } from './libs/mongoose/mongoose';
import keys from './config/keys';

const app = express();
const eraseDatabase = false;

app.use(bodyParser.json());
app.use(cors('*'));

app.use(`/${keys.authVer}`, pricesAPI);

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    console.log(`Price API Service listening on port ${process.env.PORT}!`);
  });
});

export default app;
