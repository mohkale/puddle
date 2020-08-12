import app from '../app';
import db from '../database';

const USER = 'solo' // only one user system

app.get('/settings', async (req, res) => {
  const { user: _, ...settings } = db.settings.findOne({ user: USER }) || {}
  res.json({
    status: 'OK',
    body: settings
  })
})

app.post('/settings', async (req, res) => {
  if (db.settings.findOne({ user: USER })) {
    db.settings.update({ user: USER }, { ...req.body, user: USER })
  } else {
    db.settings.save({...req.body, user: USER})
  }

  res.sendStatus(200)
})
