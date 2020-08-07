import React from 'react';

import { GeneralSection  } from './sections/general';
import { TransferSection } from './sections/transfers';
import { TorrentSection  } from './sections/torrent';
import { ErrorSection    } from './sections/error';

interface DetailsViewProps {
  torrentId: number
}

export function DetailsView() {
  return (
    <table className="torrent-details__general-view">
      <tbody>
        <GeneralSection />
        <TransferSection />
        <TorrentSection />
        <ErrorSection />
      </tbody>
    </table>
  );
}
