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
