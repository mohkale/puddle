import express from 'express';
import logger from '../logger';
import app, { serverPromise, nodeEnv } from '../app';

if (nodeEnv !== 'production') {
  // conditionally setup webpack builds when not in production.
  serverPromise.then(async () => {
    logger.debug('connecting webpack builds to server')
    const { default: webpack } = await import('webpack')
    const { default: webpackMiddleware } = await import('webpack-dev-middleware')
    const { default: webpackConfig, statsConfig } = await import('../../webpack.config')
    const { default: webpackHotMiddleware } = await import('webpack-hot-middleware')

    const compiler = webpack(webpackConfig({ [nodeEnv]: true }))
    app.use(webpackMiddleware(compiler, { stats: statsConfig }))
    app.use(webpackHotMiddleware(compiler))
  })
} else {
  logger.debug('serving assets from build directory')
  app.use(express.static('build'))
}

