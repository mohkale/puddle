import React from 'react';
import ProgressBar from './progress-bar';

import {
  TransmissionTorrentStatus as TorrentStatus
} from '@transmission';
import { Torrent, TorrentFields } from '@client/models';

import { BytesWithUnit } from '@client/components';
import { formatDuration, padString } from '@client/utils';

function formatDate(timestamp: number) {
  const d = new Date(timestamp * 1000),
        year = d.getFullYear(),
        month = d.getMonth() + 1,
        day = d.getDay() + 1;

  // NOTE maybe include hour.minute.second?
  return `${year}.${padString(month.toString(), 2)}.${padString(day.toString(), 2)}`
}

/*eslint no-case-declarations: "off"*/
export default function renderColumn(field: TorrentFields, torrent: Torrent) {
  switch (field) {
    case TorrentFields.QUEUE_POSITION:
      return torrent.queuePosition + 1
    case TorrentFields.NAME:
      return torrent.name
    case TorrentFields.PROGRESS:
      return <ProgressBar progress={torrent.progress * 100} classes={torrent.classes} />;
    case TorrentFields.DOWNLOADED:
      return <BytesWithUnit bytes={torrent.downloadedEver} />;
    case TorrentFields.DOWNLOAD_SPEED:
      return <BytesWithUnit bytes={torrent.rateDownload} perSecond={true} />;
    case TorrentFields.UPLOADED:
      return <BytesWithUnit bytes={torrent.uploadedEver} />;
    case TorrentFields.UPLOAD_SPEED:
      return <BytesWithUnit bytes={torrent.rateUpload} perSecond={true} />;
    case TorrentFields.ETA:
      if (torrent.eta <= -1 || torrent.status !== TorrentStatus.DOWNLOAD) {
        return ""
      }

      return formatDuration(torrent.eta * 1000)
    case TorrentFields.RATIO:
       return (torrent.uploadRatio >= 0) ? torrent.uploadRatio.toFixed(2) : ''
    case TorrentFields.FILE_SIZE:
      return <BytesWithUnit bytes={torrent.sizeWhenDone} />;
    case TorrentFields.ADDED:
      return formatDate(torrent.addedDate)
    case TorrentFields.TAGS:
      return torrent.labels.join(', ')
    case TorrentFields.COMPLETED_DATE:
      if (torrent.doneDate === 0)
        return ''
      return formatDate(torrent.doneDate)
  }
}
