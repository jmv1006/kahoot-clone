import express from 'express';
import cors from 'cors';
import GameRouter from './routes/game';
import UserRouter from './routes/user';
import bodyParser from 'body-parser';

const app = express();

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/games', GameRouter);
app.use('/users', UserRouter);

export default app;
