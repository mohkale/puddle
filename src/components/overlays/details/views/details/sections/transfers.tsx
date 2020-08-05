import { useSelector } from 'react-redux';

import { TableSection } from '../section';
import { torrentSelector } from '../../../utils';

export function TransferSection() {
  const percentDone = useSelector(torrentSelector(t => t.percentDone))
  const peersConnected = useSelector(torrentSelector(t => t.peersConnected))
  const peerCount = useSelector(torrentSelector(t => Object.keys(t.peers).length))

  return TableSection({
    title: 'Transfer',
    entries: [
      {
        key: 'Downloaded',
        val: `${(percentDone * 100).toFixed(2)}%`
      },
      {
        key: 'Peers',
        val: `${peersConnected} of ${peerCount}`
      }
    ]
  })
}
