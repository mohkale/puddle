import { torrentClass, TorrentClasses } from '../classes';
import { generateTorrent } from '@tests/utils';
import {
  TransmissionError as TorrentError,
  TransmissionTorrentStatus as TorrentStatus,
} from '@transmission';

const defaultTorrent = generateTorrent({})

const completeTorrent = generateTorrent({ percentDone: 1 })
const downloadingTorrent = generateTorrent({ status: TorrentStatus.DOWNLOAD })
const seedingTorrent = generateTorrent({ status: TorrentStatus.SEED })
const stoppedTorrent = generateTorrent({ status: TorrentStatus.STOPPED })
const checkingTorrent = generateTorrent({ status: TorrentStatus.CHECK })

// Queued Torrents
const checkingQueuedTorrent = generateTorrent({ status: TorrentStatus.CHECK_WAIT })
const downloadingQueuedTorrent = generateTorrent({ status: TorrentStatus.DOWNLOAD_WAIT })
const seedingQueuedTorrent = generateTorrent({ status: TorrentStatus.SEED_WAIT })

const erroredTorrent = generateTorrent({ error: TorrentError.LOCAL_ERROR })

const allTorrents =
  [defaultTorrent, completeTorrent, downloadingTorrent, stoppedTorrent, checkingTorrent,
   seedingTorrent, checkingQueuedTorrent, downloadingQueuedTorrent, seedingQueuedTorrent,
   erroredTorrent];

describe('torrent-classes', () => {
  it('always puts every torrent in the ALL class', () => {
    allTorrents.forEach(torrent => {
      expect(torrentClass(torrent) & TorrentClasses.ALL).not.toBe(0)
    })
  })

  it('considers non-queued and non-stopped torrents to be active', () => {
    [downloadingTorrent, seedingTorrent, checkingTorrent]
      .forEach(torrent => {
        expect(torrentClass(torrent) & TorrentClasses.ACTIVE).not.toBe(0)
        expect(torrentClass(torrent) & TorrentClasses.INACTIVE).toBe(0)
      })
  })

  it('considers all other kinds of torrents to be inactive', () => {
    [checkingQueuedTorrent, downloadingQueuedTorrent, seedingQueuedTorrent, stoppedTorrent]
      .forEach(torrent => {
        expect(torrentClass(torrent) & TorrentClasses.ACTIVE).toBe(0)
        expect(torrentClass(torrent) & TorrentClasses.INACTIVE).not.toBe(0)
      })
  })

  it('can identify errored torrents', () => {
    expect(torrentClass(erroredTorrent) & TorrentClasses.ERROR).not.toBe(0)
  })
})
