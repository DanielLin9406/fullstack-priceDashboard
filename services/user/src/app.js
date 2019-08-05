import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import user from './routes/user';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', user);

app.listen(process.env.PORT, () => {
  console.log(`User API Service listening on port ${process.env.PORT}!`);
});

export default app;
