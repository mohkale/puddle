import React from 'react';
import ProgressBar from './progress-bar';

import {
  TransmissionTorrentStatus as TorrentStatus
} from '@transmission';
import { Torrent } from '@client/models';

import { ColumnType } from '@client/stores';
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
export default function renderColumn(field: ColumnType, torrent: Torrent) {
  switch (field) {
    case ColumnType.QUEUE_POSITION:
      return torrent.queuePosition + 1
    case ColumnType.NAME:
      return torrent.name
    case ColumnType.PROGRESS:
      return <ProgressBar progress={torrent.progress * 100} classes={torrent.classes} />;
    case ColumnType.DOWNLOADED:
      return <BytesWithUnit bytes={torrent.downloadedEver} />;
    case ColumnType.DOWNLOAD_SPEED:
      return <BytesWithUnit bytes={torrent.rateDownload} perSecond={true} />;
    case ColumnType.UPLOADED:
      return <BytesWithUnit bytes={torrent.uploadedEver} />;
    case ColumnType.UPLOAD_SPEED:
      return <BytesWithUnit bytes={torrent.rateUpload} perSecond={true} />;
    case ColumnType.ETA:
      if (torrent.eta <= -1 || torrent.status !== TorrentStatus.DOWNLOAD) {
        return ""
      }

      return formatDuration(torrent.eta * 1000)
    case ColumnType.RATIO:
       return (torrent.uploadRatio >= 0) ? torrent.uploadRatio.toFixed(2) : ''
    case ColumnType.FILE_SIZE:
      return <BytesWithUnit bytes={torrent.sizeWhenDone} />;
    case ColumnType.ADDED:
      return formatDate(torrent.addedDate)
    case ColumnType.TAGS:
      return torrent.labels.join(', ')
    case ColumnType.COMPLETED_DATE:
      if (torrent.doneDate === 0)
        return ''
      return formatDate(torrent.doneDate)
  }
}
