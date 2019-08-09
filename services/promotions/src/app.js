import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './model/promotionsModel';
import promotionsAPI from './routes/promotionsAPI';
import { saveData } from './db/seeds/seeds';
import { connectDb } from './libs/mongoose/mongoose';

const app = express();
const eraseDatabase = true;

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', promotionsAPI);

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    console.log(
      `Promotions API Service listening on port ${process.env.PORT}!`
    );
  });
});

export default app;
