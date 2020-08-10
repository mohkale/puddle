import app from '../app';
import logger from '../logger';
import { newSession, sessionAssigned } from '../session';
import Transmission from '../../transmission/server';

app.get('/authenticated', async (req, res) => {
  if (sessionAssigned(req.session)) {
    res.sendStatus(200)
  } else {
    res.sendStatus(418)
  }
})

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
