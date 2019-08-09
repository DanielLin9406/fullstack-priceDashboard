import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userAPI from './routes/userAPI';

const app = express();

app.use(bodyParser.json());
app.use(cors('*'));

app.use('/v1', userAPI);

app.listen(process.env.PORT, () => {
  console.log(`User API Service listening on port ${process.env.PORT}!`);
});

export default app;
