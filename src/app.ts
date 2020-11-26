import 'reflect-metadata';

import express, { Application } from 'express';

import Logger from './middlewares/logger';
import authRoutes from './routes/auth.routes';
import config from './config';
import cors from 'cors';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';

async function startServer() {
  const app: Application = express();

  createConnection();

  //middlewares
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());

  // routes
  app.use(userRoutes);
  app.use('/auth', authRoutes);

  app.listen(config.port, () => {
    Logger.info(
      `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `
    ).on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
  });
}

startServer();
