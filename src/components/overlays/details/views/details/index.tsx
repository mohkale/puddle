import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { TorrentDetailsContext } from '../../context';
import {
  selectTorrentById, torrentPriorityChanged, torrentsUpdated,
  TorrentState, updateTorrent
} from '@puddle/stores'
import { TorrentDetailed, Torrent } from '@puddle/models';
import { scaleBytes } from '@puddle/utils';
import { TransmissionError } from '@puddle/transmission';

import { GeneralSection } from './sections/general';
import { TransferSection } from './sections/transfers';
import { TorrentSection } from './sections/torrent';
import { ErrorSection } from './sections/error';

interface DetailsViewProps {
  torrentId: number
}

export function DetailsView() {
  const { torrent } = useContext(TorrentDetailsContext)

  return (
    <table className="torrent-details-table">
      <tbody>
        <GeneralSection
          addedDate={torrent.addedDate}
          downloadDir={torrent.downloadDir}
          labels={torrent.labels}
            />
        <TransferSection
          percentDone={torrent.percentDone}
          peersConnected={torrent.peersConnected}
          peerCount={Object.keys(torrent.peers).length}
            />
        <TorrentSection
          dateCreated={torrent.dateCreated}
          hashString={torrent.hashString}
          totalSize={torrent.totalSize}
          creator={torrent.creator}
          comment={torrent.comment}
          isPrivate={torrent.isPrivate}
            />
        <ErrorSection
          error={torrent.error}
          errorString={torrent.errorString}
            />
      </tbody>
    </table>
  );
}
