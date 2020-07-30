export * from './responses';

import {
  TransmissionSession                as SessionResponse,
  TransmissionSession_Mutable        as SessionMutableFields,
  TransmissionTorrent                as TorrentResponse,
  TransmissionTorrent_Mutable        as TorrentMutableFields,
  TransmissionTorrent_WriteOnly      as TorrentWriteOnlyFields,
  TransmissionRecentlyActiveTorrents as TransmissionRecentlyActiveResponse,
  TransmissionSessionStats           as SessionResponseStats,
  TransmissionNewTorrent             as NewTorrentResponse
} from './responses';

/**
 * a single torrent id, according to the transmission spec this
 * can be a numerical id or the sha1 hash for the associated torrent.
 */
export type TorrentId = number | string

/**
 * A reference to potentially many torrents, the transmission spec also
 * states that if this isn't provided (is undefined) then all torrents
 * will be affected.
*/
export type TorrentIds = TorrentId | TorrentId[] | undefined | null

/**
 * Converts an {@code TorrentIds} argument to an object with
 * the associated fields for a request. This really only exists
 * to make stripping out the ids field when {@code ids} is undefined
 * more straightforward.
 *
 * @param ids that are going to be passed in the request.
 * @returns an empty params object containing just the intended
 *          recipients for the current request.
 */
function torrentIdsToParam(ids: TorrentIds, extraProps?: any) {
  // because an empty [] is also false :/
  if (ids === undefined || ids === null) {
    return {...extraProps}
  }

  return {ids: ids, ...extraProps}
}

/**
 * The Puddle Transmission Interface.
 *
 * This class contains methods to automate the interaction between
 * the puddle frontend and the transmission backend in a type safe
 * way. Including automatic assigning of associated CSRF tokens or
 * request tags between requests. Automatically casting returns
 * values to appropriate interfaces, etc.
 *
 */
export default class Transmission {
  url: string
  sessionId: string = ''
  requestTag?: number

  constructor(url: string) {
    this.url = url
  }

  static fromParams(
    host: string, port: number, path: string, secure: boolean=false
  ) {
    return new Transmission(`${secure ? "https" : "http"}://${host}:${port}/${path}/rpc`)
  }

  /**
   * Construct the body of a fetch request from a transmission
   * request (an object containing a method and some method args).
   *
   * @returns an object that can be passed to {@code fetch}.
   */
  private requestInit(params: any): RequestInit {
    if (this.requestTag) {
      // WARN mutates params in place, TODO check
      // whether there's any benefit to cloning it.
      params.tag = this.requestTag
    }

    return {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-Transmission-Session-Id': this.sessionId,
      },
      body: JSON.stringify(params)
    }
  }

  /**
   * Perform a request to the associated transmission daemon.
   *
   * NOTE this method is public for debug purposes, you shouldn't
   * ever need to call it directly. Instead you should use one of
   * the extension methods to better interface with the transmission
   * daemon.
   *
   * @param method the transmission request to perform (see the RPC
   *               specification).
   * @param args the associated arguments for {@code method}.
   * @returns a promise containing the JSON response of the request.
   */
  request(method: string, args: any) {
    const params = { method: method, 'arguments': args }
    return fetch(this.url, this.requestInit(params))
      .then(resp => {
        // check and refresh the session id in case it has expired.
        if (resp.status === 409) {
          const sessionId = resp.headers.get('x-transmission-session-id')
          if (sessionId) {
            this.sessionId = sessionId
            return fetch(this.url, this.requestInit(params))
          }
        }

        if (!resp.ok) throw resp; else return resp;
      })
      .then(resp => resp.json())
      .then(json => {
        if (json.tag) {
          this.requestTag = json.tag;
        }

        if (json.result !== "success") {
          throw json
        } else {
          return json
        }});
  }

  async session() {
    return this.request('session-get', {})
      .then(json => json["arguments"] as SessionResponse);
  }

  async sessionStats() {
    return this.request('session-stats', {})
      .then(json => json['arguments'] as SessionResponseStats)
  }

  /**
   * Set values for the mutable fields of the current session
   * instance. Compile time type safety is insured due to the
   * reciever type, but there won't be any runtime safety.
   *
   * For those using vanilla JS bindings, make sure not to pass
   * any fields in {@code props} that isn't in the underlying
   * type.
   *
   * @param props the new assignments for the session fields.
   */
  async setSession(props: Partial<SessionMutableFields>) {
    return this.request('session-set', props);
  }

  async moveTorrentsUp(torrents: TorrentIds) {
    return this.request('queue-move-up', torrentIdsToParam(torrents))
  }

  async moveTorrentsDown(torrents: TorrentIds) {
    return this.request('queue-move-down', torrentIdsToParam(torrents))
  }

  async moveTorrentsToTop(torrents: TorrentIds) {
    return this.request('queue-move-top', torrentIdsToParam(torrents))
  }

  async moveTorrentsToBottom(torrents: TorrentIds) {
    return this.request('queue-move-bottom', torrentIdsToParam(torrents))
  }

  async startTorrent(torrents: TorrentIds) {
    return this.request('torrent-start', torrentIdsToParam(torrents))
  }

  async startTorrentNow(torrents: TorrentIds) {
    return this.request('torrent-start-now', torrentIdsToParam(torrents))
  }

  async stopTorrent(torrents: TorrentIds) {
    return this.request('torrent-stop', torrentIdsToParam(torrents))
  }

  async vertifyTorrent(torrents: TorrentIds) {
    return this.request('torrent-verify', torrentIdsToParam(torrents))
  }

  async reannounceTorrent(torrents: TorrentIds) {
    return this.request('torrent-reannounce', torrentIdsToParam(torrents))
  }

  async setTorrentLocation(torrents: TorrentIds, location: string, move: boolean=false) {
    return this.request('torrent-set-location', torrentIdsToParam(torrents, {
      location: location,
      move: move
    }))
  }

  async removeTorrent(ids: TorrentIds, eraseLocalData: boolean) {
    return this.request('torrent-remove', torrentIdsToParam(ids, {
      'delete-local-data': eraseLocalData
    }))
  }

  async addTorrent(
    filename:     string,
    cookies?:     string,
    downloadDir?: string,
    paused:       boolean = true,

    // other possible parameters which I doubt we'll be using.
    /* metaInfo: string
       filesWanted: string[],
       filesUnwanted: string[],
       priorityHigh: string[],
       priorityLow: string[],
       priorityNormal: string[],
       bandwidthPriority?: number,
       peerLimit?: number, */
  ) {
    const props = { filename: filename }
    if (undefined !== cookies)     props['cookies'] = cookies
    if (undefined !== downloadDir) props['download-dir'] = downloadDir
    if (undefined !== paused)      props['paused'] = paused

    return this.request('torrent-add', props)
      .then(resp => {
        const value = resp['arguments']['torrent-duplicate'] ||
                      resp['arguments']['torrent-added'];

        value.isDuplicate = !!resp['arguments']['torrent-duplicate']
        return value as NewTorrentResponse
      });
  }

  async setTorrent(ids: TorrentIds, props: Partial<TorrentMutableFields & TorrentWriteOnlyFields>) {
    return this.request('torrent-set', torrentIdsToParam(ids, props))
  }

  /**
   * An alias for {@code this.torrents} which operates specifically on a single
   * torrent.
   */
  async torrent(id: TorrentId, ...fields: (keyof TorrentResponse)[]) {
    return this.torrents(id, ...fields)
      .then(torrents => torrents[0]);
  }

  async torrents(ids: TorrentIds, ...fields: (keyof TorrentResponse)[]) {
    // NOTE there may be a way to get even more helpful type information here.
    // if typescripts Partial lets you specify at compile time the fields that
    // the response definitely has. In practice that doesn't seem likely :cry:.
    return this.request('torrent-get', torrentIdsToParam(ids, {fields: fields}))
      .then(resp => resp['arguments'].torrents.map(torrent => torrent as Partial<TorrentResponse>))
  }

  /**
   * Transmission supports a special field for the ids parameter in requests,
   * that returns information about how the state of transmission has changed
   * over the last [[https://github.com/transmission/transmission/issues/809][RECENTLY_ACTIVE_SECONDS]].
   */
  async recentlyActiveTorrents(...fields: (keyof TorrentResponse)[]) {
    return this.request('torrent-get', {ids: 'recently-active', fields: fields})
      .then(resp => resp['arguments'] as TransmissionRecentlyActiveResponse)
  }
}
