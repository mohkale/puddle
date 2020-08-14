import moment from 'moment';
import { Torrent, TorrentDetailed, TorrentClasses, torrentFromResponse } from '@client/models';
import {
  TransmissionError as TorrentError,
  TransmissionTorrentStatus as TorrentStatus,
} from '@transmission';

let torrentCounter = 0;

function defaultTorrentFields() {
  return {
    id: torrentCounter++,
    name: `torrent-name__${name}`,
    status: TorrentStatus.STOPPED,
    percentDone: 0,
    downloadedEver: 0,
    rateDownload: 0,
    uploadedEver: 0,
    rateUpload: 0,
    eta: -1,
    uploadRatio: 0,
    sizeWhenDone: 1024,
    addedDate: moment.now(),
    error: TorrentError.OK,
    queuePosition: torrentCounter,
    labels: [],
    recheckProgress: 0,
    doneDate: -1,
    bandwidthPriority: 0,
    magnetLink: '',
    downloadDir: '',
    hashString: '',
    trackers: [],
  }
}

export function generateTorrent(props: Partial<Torrent>): Torrent {
  return Object.assign(torrentFromResponse(defaultTorrentFields()), props)
}
