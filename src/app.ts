import 'reflect-metadata';

import express, { Application } from 'express';

import authRoutes from './routes/auth.routes';
import cors from 'cors';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';

const app: Application = express();

createConnection();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(userRoutes);
app.use('/auth', authRoutes);

export default app;
