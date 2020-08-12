import chalk from 'chalk';
import moment from 'moment';

import app, { serverPromise, nodeEnv } from './app';

import logger from './logger';
logger.info(`starting puddle at ${moment().format('YYYY-MM-DD HH:mm:s')}`)
logger.debug(`environment is ${nodeEnv}`)

import config from '../config';

import './webpack';
import './routes/auth';
import './routes/proxy';
import './routes/utils';
import './routes/settings';
import './routes/notifications';

serverPromise.then(() =>
  app.listen(
    config.serverPort,
    config.serverHost,
    () => {
      const address = `${config.serverHost}:${config.serverPort}`
      logger.info(`puddle listening at ${chalk.magenta(address)}!`)
    })
    .on('error', error => {
      logger.error(error.message)
    }))
