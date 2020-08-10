import app from '../app';
import logger from '../logger';
import proxy from 'express-http-proxy';
import { sessionAssigned } from '../session';

const NO_TRANSMISSION_URL = 'No Transmission URL'

/*
 * Proxy requests through to the transmission URL
 * associated with this users session.
 */
app.use('/transmission', proxy(req => {
  if (sessionAssigned(req.session)) {
    return req.session.transmission.host
  }

  throw NO_TRANSMISSION_URL
}, {
  memoizeHost: false,
  proxyReqPathResolver: req => {
    if (sessionAssigned(req.session)) {
      return req.session.transmission.path
    }

    throw NO_TRANSMISSION_URL
  },
  onError: (err, req, res) => {
    if (err === NO_TRANSMISSION_URL) {
      res.status(400)
      res.json({ status: 'Error', body: { message: 'session has no associated transmission URL' } })
    } else {
      logger.error('transmission-proxy', err)
      res.sendStatus(500)
    }
  }
}))
