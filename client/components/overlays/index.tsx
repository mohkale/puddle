import '@cstyles/overlays';
import React from 'react';
import { OverlayType } from '@client/stores'

import TorrentDetails from './details';
import Settings from './settings';
import SetLabels from './set-labels';
import Statistics from './statistics';
import RemoveTorrent from './torrent-remove';
import TorrentAdd from './torrent-add';
import SetLocation from './set-location';
import Notifications from './notifications';

interface RenderOverlayProps {
  type: OverlayType
}

export default function RenderOverlay(props: RenderOverlayProps) {
  switch (props.type) {
    case OverlayType.TORRENT_DETAILS:
      return <TorrentDetails />
    case OverlayType.SETTINGS:
      return <Settings />
    case OverlayType.SET_LABELS:
      return <SetLabels />
    case OverlayType.STATISTICS:
      return <Statistics />
    case OverlayType.TORRENT_REMOVE:
      return <RemoveTorrent />
    case OverlayType.TORRENT_ADD:
      return <TorrentAdd />
    case OverlayType.TORRENT_SET_LOCATION:
      return <SetLocation />
    case OverlayType.NOTIFICATIONS:
      return <Notifications />
  }

  return null
}
