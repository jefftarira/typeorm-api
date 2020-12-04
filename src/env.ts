import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const env = {
  node_env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    routePrefix: process.env.APP_ROUTE_PREFIX || '/',
    port: process.env.APP_PORT,
    banner: process.env.APP_BANNER,
  },
  log: {
    level: process.env.LOG_LEVEL,
    output: process.env.LOG_OUTPUT,
  },
  db: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'test-secret-jwt',
  },
  monitor: {
    enabled: process.env.MONITOR_ENABLED,
    route: process.env.MONITOR_ROUTE,
    username: process.env.MONITOR_USERNAME,
    password: process.env.MONITOR_PASSWORD,
  },
};
