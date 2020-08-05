import React from 'react';
import { useSelector } from 'react-redux';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FallbackMessage from '../../fallback';
import { torrentSelector } from '../../utils';

import { BytesWithUnit } from '@puddle/components';
import { TransmissionTorrentPeers as TorrentPeers } from '@puddle/transmission'

function PeerRow(peer: TorrentPeers) {
  return (
    <tr>
      <td>{peer.address}</td>
      <td><BytesWithUnit bytes={peer.rateToClient} /></td>
      <td><BytesWithUnit bytes={peer.rateToPeer} /></td>
      <td>{(peer.progress * 100).toFixed()}%</td>
      <td>{peer.flagStr}</td>
      <td>{peer.clientName}</td>
      <td>
        {peer.isEncrypted &&
          <FontAwesomeIcon icon={faCheck} className="check icon" /> }
      </td>
    </tr>
  )
}

export function PeersView() {
  const peers = useSelector(torrentSelector(t => t.peers))

  if (peers.length === 0) {
    return (
      <FallbackMessage>
        No <span className="highlight">Peer</span> Information is Available For This Torrent.
      </FallbackMessage>
    )
  }

  return (
    <Scrollbar>
      <table className="torrent-peers-table">
        <thead>
          <tr>
            <td>Peer</td>
            <td>DL</td>
            <td>UL</td>
            <td>%</td>
            <td>Flags</td>
            <td>Client</td>
            <td>Encrypted</td>
          </tr>
        </thead>
        <tbody>
          {peers.map(peer => <PeerRow key={peer.address} {...peer} />)}
        </tbody>
      </table>
    </Scrollbar>
  );
}

