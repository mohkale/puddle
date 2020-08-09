import { TransmissionTorrentStatus as TorrentState } from '@transmission';

export function formatTorrentState(state: TorrentState) {
  switch (state) {
    case TorrentState.STOPPED:
      return 'Stopped'
    case TorrentState.CHECK_WAIT:
    case TorrentState.DOWNLOAD_WAIT:
    case TorrentState.SEED_WAIT:
      return 'Queued'
    case TorrentState.CHECK:
      return 'Checking'
    case TorrentState.DOWNLOAD:
      return 'Downloading'
    case TorrentState.SEED:
      return 'Seeding'
  }
}
