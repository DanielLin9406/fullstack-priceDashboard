import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userAPI from './routes/userAPI';

import logger from './libs/logger';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', userAPI);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(process.env.PORT, () => {
  logger.info(`User API Service listening on port ${process.env.PORT}!`);
});

export default app;
