import React from 'react';
import ProgressBar from './progress-bar';

import {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission';
import { Torrent, TorrentFields } from '@puddle/stores';

import {
  scaleBytes, timeFormat, padString
} from '@puddle/utils';

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
    case TorrentFields.DOWNLOADED: {
      const [num, unit] = scaleBytes(torrent.downloadedEver!)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}</em> </span>
      )
    }
    case TorrentFields.DOWNLOAD_SPEED: {
      const [num, unit] = scaleBytes(torrent.rateDownload)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}/s</em> </span>
      )
    }
    case TorrentFields.UPLOADED: {
      const [num, unit] = scaleBytes(torrent.uploadedEver)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}</em> </span>
      )
    }
    case TorrentFields.UPLOAD_SPEED: {
      const [num, unit] = scaleBytes(torrent.rateUpload)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}/s</em> </span>
      )
    }
    case TorrentFields.ETA:
      if (torrent.eta <= -1 || torrent.status !== TorrentStatus.DOWNLOAD) {
        return ""
      }

      return timeFormat(torrent.eta)
    case TorrentFields.RATIO:
       return (torrent.uploadRatio >= 0) ? torrent.uploadRatio.toFixed(2) : ''
    case TorrentFields.FILE_SIZE: {
      const [num, unit] = scaleBytes(torrent.sizeWhenDone)
      return (
        <span>{num.toFixed(2)}<em className="unit">{unit}B</em> </span>
      )
    }
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
