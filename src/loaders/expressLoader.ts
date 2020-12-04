import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec';
import express, { Application } from 'express';

import apiRoutes from '../routes';
import cors from 'cors';
import { env } from '../env';
import helmet from 'helmet';
import morgan from 'morgan';

export const expressLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const expressApp: Application = express();

    //middlewares
    expressApp.use(cors());
    expressApp.use(helmet());
    expressApp.use(morgan('dev'));
    expressApp.use(express.json());

    // routes
    expressApp.use(env.app.routePrefix, apiRoutes);

    // Run application to listen on given port
    const server = expressApp.listen(env.app.port);
    settings.setData('express_server', server);
    settings.setData('express_app', expressApp);
  }
};
