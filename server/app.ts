import morgan from 'morgan';
import express from 'express';
import session from 'express-session';

import SessionFileStore from 'session-file-store';
const FileStore = SessionFileStore(session);

import logger from './logger';
import config from '../config';

export const nodeEnv = process.env.NODE_ENV || 'development'

/**
 * Used to block the binding of the server until after this
 * promise is resolved. Until top level await is ubiquotous
 * this'll have to do.
 */
export const serverPromise = new Promise(resolve => resolve())

const app = express()
export default app

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use(morgan('dev', {
  stream: { write: (msg: string) => logger.debug(msg.replace(/\n$/, '')) }
}))

app.use(session({
  secret: config.secret,
  resave: false,
  name: 'puddle-sid',
  saveUninitialized: true,
  store: new FileStore({
    path: config.sessionPath,
    retries: 0,
    // logFn: logger.log.bind(logger),
  })
}))
