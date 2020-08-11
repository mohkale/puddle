import app from '../app'
import db from '../database';

/**
 * Fetch all notifications stored in the db.
 */
app.get('/notifications', (req, res) => {
  res.json({
    status: 'OK',
    body: {
      notifications: db.notifications.find()
    }
  })
})

/**
 * Fetch a notification by its ID.
 *
 * @param req.params.id {string} the identifier for the notification to fetch.
 */
app.get('/notifications/:id(\\d+)', (req, res) => {
  const id = Number(req.params.id)
  const entry = db.notifications.findOne({ 'id': id })
  if (entry === undefined) {
    res.status(404)
    res.json({ status: 'Error', body: { message: `unable to find entry with id ${id}` } })
  } else {
    res.json({ status: 'OK', body: { notifications: [entry] } })
  }
})

/**
 * Fetch the next block of notification preceding a given notification.
 *
 * @param req.query.marker {string} = undefined the identifier for the
 * notification from which we start returning older notifications. This
 * notification wont be included in the response. If this isn't supplied
 * the marker defaults to the latest notification.
 * @param req.query.count {number} = 10 the number of notifications before
 * the marker to be returned.
 */
app.get('/notifications/from', (req, res) => {
  const { marker, countString } = req.query
  const count = countString ? Number(countString) : 10

  let max;
  const all = db.notifications.find()
  if (marker === undefined) {
    max = all.length
  } else {
    max = all.findIndex(o => o.id === marker)
    if (max === -1) {
      res.status(400)
      res.json({ status: 'Error', body: { message: `failed to find notification with id: ${marker}` } })
      return
    }
  }

  const min = Math.max(0, max-count)
  const entries = all.slice(min, max)
  res.json({
    status: 'OK',
    body: {
      notifications: entries,
      moreExists: min !== 0,
    }
  })
})

/**
 * Push a new notifications to the db.
 *
 * @param req.body {Notification} the notification to add to the db
 */
app.post('/notifications', (req, res) => {
  const notification = req.body
  if (notification.id &&
      db.notifications.findOne({ id: notification.id })) {
    res.status(400)
    res.json({ status: 'Error', body: { message: `notification with id already exists ${notification.id}` } })
  }

  db.notifications.save(req.body)
  res.json({ status: 'OK' })
})

/**
 * Delete a notification from the db.
 *
 * @param req.params.id the identifier of the notification to remove.
 */
app.delete('/notifications/:id', (req, res) => {
  db.notifications.remove({ id: req.params.id })
  res.json({ status: 'OK' })
})
