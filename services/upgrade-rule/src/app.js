import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import upgradeRule from './routes/upgradeRule';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', upgradeRule);

app.listen(process.env.PORT, () => {
  console.log(`UpgradeRule API Service listening on port ${process.env.PORT}!`);
});

export default app;
