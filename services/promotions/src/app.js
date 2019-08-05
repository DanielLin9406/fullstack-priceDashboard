import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import promotions from './routes/promotions';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', promotions);

app.listen(process.env.PORT, () => {
  console.log(`Promotions API Service listening on port ${process.env.PORT}!`);
});

export default app;
