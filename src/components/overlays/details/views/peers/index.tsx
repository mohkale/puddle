import React, { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '@puddle/components';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TransmissionTorrentPeers as TorrentPeers
} from '@puddle/transmission'
import { scaleBytes } from '@puddle/utils';
import FallbackMessage from '../../fallback';
import { torrentSelector } from '../../utils';

function PeerRow(peer: TorrentPeers) {
  const [upload, uploadUnit] = scaleBytes(peer.rateToClient)
  const [download, downloadUnit] = scaleBytes(peer.rateToPeer)

  return (
    <tr>
      <td>{peer.address}</td>
      <td>{download.toFixed(2)}<em className="unit">{downloadUnit}</em></td>
      <td>{upload.toFixed(2)}<em className="unit">{uploadUnit}</em></td>
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
  );
}

