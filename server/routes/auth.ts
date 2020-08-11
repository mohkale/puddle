import app from '../app';
import logger from '../logger';
import { newSession, sessionAssigned } from '../session';
import Transmission from '../../transmission/server';

/**
 * Check whether the current users session has an associated
 * transmission URL.
 */
app.get('/authenticated', async (req, res) => {
  if (sessionAssigned(req.session)) {
    res.sendStatus(200)
  } else {
    res.sendStatus(418)
  }
})

/**
 * Authenticate the current user session.
 *
 * This controller attempts to verify the pointed URL is a valid
 * transmission instance by trying to connect to it, before accepting
 * it as valid and authenticating the user.
 *
 * @param req.body.transmissionHost the hostname (non path portion)
 * of the URL of the transmission daemon to connect to.
 * @param req.body.transmissionPath the path portion to use alongside
 * {req.body.transmissionHost}.
 */
app.post('/auth', async (req, res) => {
  const { transmissionHost: host, transmissionPath: path } = req.body
  if ([host, path].indexOf(o => !!o) !== -1) {
    res.sendStatus(400)
    return
  }

  const transmission = new Transmission(`${host}${path}`)
  try {
    await transmission.session()

    newSession(req.session, { transmission: { host, path } })
    res.json({
      status: 'OK',
      body: {
        sessionId: transmission.sessionId
      }
    })
  } catch {
    res.sendStatus(400)
  }
})

/**
 * Erase the current users session.
 */
app.post('/forget', async (req, res) => {
  const onSuccess = () => {
    res.status(200)
    res.json({ status: 'OK', body: { message: 'session erased' } })
  }

  if (sessionAssigned(req.session)) {
    req.session.regenerate(err => {
      if (err) {
        logger.error('failed to forget session:', err)
        res.status(500)
        res.json({ status: 'error', body: { message: err.toString() } })
      } else {
        onSuccess()
      }
    })
  } else {
    onSuccess()
  }
})
