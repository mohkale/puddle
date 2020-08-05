import '@cstyles/overlays';
import React from 'react';
import { OverlayType } from '@puddle/stores'

import TorrentDetails from './details';
import Settings from './settings';
import SetLabels from './set-labels';

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
  }

  return null
}
