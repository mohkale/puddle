import React, { Fragment, useContext } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
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
  return (
    <table className="torrent-details-table">
      <tbody>
        <GeneralSection />
        <TransferSection />
        <TorrentSection />
        <ErrorSection />
      </tbody>
    </table>
  );
}
