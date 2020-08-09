import Transmission, {
  TransmissionTorrentAddSource as TorrentAddSource
} from '@transmission';

import { MessageType, MessageLevel } from '@client/components';

/**
 * Generic on-submit handler for adding a torrent to transmission
 * through the torrent-add modal.
 */
export async function onSubmitGeneral<T>(
  transmission: Transmission,
  entries: T[],
  labels: string[],
  destination: string,
  setEntries: (entries: T[]) => void,
  setMessages: (msgs: MessageType[]) => void,

  prepareEntry: (e: T) => TorrentAddSource,
  formatError: (e: T|undefined, i: number, error: string) => string,
) {
  setMessages([])
  const failed: (MessageType & { entry?: T })[] = []
  const newIds: number[] = []

  for (const entry of entries) {
    try {
      const resp = await transmission.addTorrent(prepareEntry(entry), destination)
      if (resp.isDuplicate) {
        failed.push({ entry, label: `is a duplicate`, level: MessageLevel.WARN })
      } else {
        newIds.push(resp.id)
      }
    } catch (err) {
      failed.push({ entry, label: (err.result || 'failed'), level: MessageLevel.ERROR })
    }
  }

  // set labels for all successfully created torrents
  if (newIds.length > 0 && labels.length > 0) {
    try {
      await transmission.setTorrent(newIds, { labels })
    } catch {
      failed.push({ label: 'failed to assign tags', level: MessageLevel.ERROR })
    }
  }

  // some of the torrent URLs failed, so show a message for them and
  // prevent the modal being exited.
  if (failed.length > 0) {
    const remainingEntries = failed
      .map(o => o.entry)
      .filter(x => x !== undefined) as T[]
    setEntries(remainingEntries)
    setMessages(failed.map((o, i) =>
      ({ ...o, label: formatError(o.entry, i+1, o.label) })))
    throw failed
  }
}
