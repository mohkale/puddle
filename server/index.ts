import moment from 'moment';
import chalk from 'chalk';
import morgan from 'morgan';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import logger from './logger';
import config from '../config';
logger.info(`starting puddle at ${moment().format('YYYY-MM-DD HH:mm:s')}`)

/**
 * Used to block the binding of the server until after this
 * promise is resolved. Until top level await is ubiquotous
 * this'll have to do.
 */
const serverPromise = new Promise(resolve => resolve())

const app = express()
const nodeEnv = process.env.NODE_ENV || 'development'
logger.debug(`environment is ${nodeEnv}`)

if (nodeEnv !== 'production') {
  // conditionally setup webpack builds when not in production.
  serverPromise.then(async () => {
    logger.debug('connecting webpack builds to server')
    const { default: webpack } = await import('webpack')
    const { default: webpackMiddleware } = await import('webpack-dev-middleware')
    const { default: webpackConfig, statsConfig } = await import('../webpack.config')

    const compiler = webpack(webpackConfig({ [nodeEnv]: true }))
    app.use(webpackMiddleware(compiler, { stats: statsConfig }))
  })
} else {
  logger.debug('serving assets from build directory')
  app.use(express.static('build'))
}

app.use('/transmission', createProxyMiddleware({
  target: 'http://localhost:7867/transmission/rpc',
  changeOrigin: true,
  logProvider: () => logger,
}))

app.use(morgan('dev', {
  stream: { write: (msg: string) => logger.debug(msg.replace(/\n$/, '')) }
}))

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
