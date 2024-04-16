import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
export const app = express();

config({
  path: './data/.env',
});

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.json({
    msg: 'worked',
  });
});
