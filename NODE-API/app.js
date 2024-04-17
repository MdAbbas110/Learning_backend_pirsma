import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
export const app = express();

config({
  path: './data/.env',
});

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  })
);

// using routes
app.use('/api/v1/users', userRouter);

app.use('/api/v1/task', taskRouter);

app.get('/', (req, res) => {
  res.json({
    msg: 'worked',
  });
});

app.use((err, req, res, next) => {
  // err.message give us the object in which there is message

  err.message = err.message || 'invalid server error';

  return res.status(404).json({
    success: false,
    msg: err.message,
  });
});
