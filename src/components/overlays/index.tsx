import '@cstyles/overlays';
import React from 'react';
import { OverlayType, OverlayKind } from '@puddle/stores'
import { TorrentDetailsOverlay, SettingsOverlay } from '@puddle/stores'

import TorrentDetails from './details';
import Settings from './settings';

export default function RenderOverlay(overlay: OverlayType) {
  switch (overlay.kind) {
    case OverlayKind.TORRENT_DETAILS:
      return <TorrentDetails {...(overlay as TorrentDetailsOverlay)} />
    case OverlayKind.SETTINGS:
      return <Settings {...(overlay as SettingsOverlay)} />
  }

  return null
}
