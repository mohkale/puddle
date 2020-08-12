import { Notification, SettingsUpdatedProps } from '@client/stores';

/**
 * check whether the given transmission URL is a valid transmission
 * instance.
 */
export async function authenticate(url: string) {
  if (!url) {
    throw `You must supply a value for Transmission Host.`
  }

  const { pathname, origin: host } = new URL(url)
  const resp = await fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transmissionHost: host, transmissionPath: pathname })
  })

  if (!resp.ok) {
    throw `Failed to Exchange Handshake.`
  }
}

/**
 * Check whether the current user has an associated
 * transmission connection.
 */
export async function authenticated() {
  const resp = await fetch('/authenticated')
  return resp.ok
}

export async function forget() {
  const resp = await fetch('/forget', { method: 'POST' })
  return resp.ok
}

export async function defaultTransmissionUrl(): Promise<string> {
  const resp = await fetch('/transmission-url');
  if (!resp.ok) {
    throw resp
  }

  const json = await resp.json();
  if (json.status !== 'OK') {
    throw resp
  }

  return json.body.url
}

export async function notificationsFrom(fromNotification?: string) {
  const query = fromNotification ? `marker=${fromNotification}` : ''
  const resp = await fetch(`/notifications/from?${query}`)
  const json = await resp.json()

  if (!resp.ok) {
    throw json.body.message
  }

  return json.body as {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    notifications: Notification<any>[],
    moreExists: boolean,
  }
}

export async function deleteNotification(id: string) {
  const resp = await fetch(`/notifications/${id}`, {method: 'DELETE'})
  if (!resp.ok) throw resp
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function saveNotifications(notifications: Notification<any>[]) {
  const resp = await fetch('/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notifications)
  })

  if (!resp.ok) throw resp
}

export async function settings() {
  const resp = await fetch('/settings')
  if (!resp.ok) throw resp

  const json = await resp.json()
  return json.body as SettingsUpdatedProps
}

export async function syncSettings(settings: SettingsUpdatedProps) {
  const resp = await fetch('/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings)
  })

  if (!resp.ok) throw resp
}
