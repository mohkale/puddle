import '@cstyles/overlays';
import React from 'react';
import { OverlayType } from '@puddle/stores'

import TorrentDetails from './details';
import Settings from './settings';

interface RenderOverlayProps {
  type: OverlayType
}

export default function RenderOverlay(props: RenderOverlayProps) {
  switch (props.type) {
    case OverlayType.TORRENT_DETAILS:
      return <TorrentDetails />
    case OverlayType.SETTINGS:
      return <Settings />
  }

  return null
}