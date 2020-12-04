import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeromLoader: MicroframeworkLoader = async (
  settings: MicroframeworkSettings | undefined
) => {
  const loadedConnectionOptions = await getConnectionOptions();

  const connnectionOptions = Object.assign(loadedConnectionOptions, {
    type: env.db.type,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: ['dist/entities/**/*.js'],
    synchronize: env.db.synchronize,
  });

  const connection = await createConnection(connnectionOptions);

  if (settings) {
    settings.setData('connection', connection);
    settings.onShutdown(() => connection.close());
  }
};
