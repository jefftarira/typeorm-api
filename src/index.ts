import 'reflect-metadata';

import express, { Application } from 'express';

import { PORT } from './config';
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

app.listen(PORT);

console.log(`Server on port ${PORT}`);
