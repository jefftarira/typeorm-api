import 'reflect-metadata';

import { Logger } from './libs/logger';
import { banner } from './libs/banner';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { expressLoader } from './loaders/expressLoader';
import { typeromLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
  loaders: [winstonLoader, typeromLoader, expressLoader],
})
  .then(() => banner(log))
  .catch((error) => log.error('Application is crashed: ' + error));
