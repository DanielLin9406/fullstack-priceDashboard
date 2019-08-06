import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './model/pricesModel';
import pricesAPI from './routes/pricesAPI';
import { saveData } from './db/writeToDB';
import { connectDb } from './libs/mongoose/mongoose';

const app = express();
const eraseDatabase = true;

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', pricesAPI);

connectDb().then(() => {
  if (eraseDatabase) {
    saveData();
  }
  app.listen(process.env.PORT, () => {
    console.log(`Price API Service listening on port ${process.env.PORT}!`);
  });
});

export default app;
