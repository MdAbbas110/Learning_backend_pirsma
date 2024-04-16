import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
export const app = express();

config({
  path: './data/.env',
});

// using middlewares
app.use(express.json());
app.use(cookieParser());

// using routes
app.use('/api/v1/users', userRouter);

app.use('/api/v1/task', taskRouter);

app.get('/', (req, res) => {
  res.json({
    msg: 'worked',
  });
});
