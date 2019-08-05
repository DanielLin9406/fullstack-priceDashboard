import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import prices from './routes/prices';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', prices);

app.listen(process.env.PORT, () => {
  console.log(`Price API Service listening on port ${process.env.PORT}!`);
});

export default app;
