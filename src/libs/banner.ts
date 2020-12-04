import { Logger } from '../libs/logger';
import { env } from '../env';

export function banner(log: Logger): void {
  if (env.app.banner) {
    log.info('-------------------------------------------');
    log.info(`Environment  : ${env.node_env}`);
    log.info(`API Prefix   : ${env.app.routePrefix}`);
    log.info(`API Port     : ${env.app.port}`);
    log.info('-------------------------------------------');
  } else {
    log.info(`Application is up and running.`);
  }
}
