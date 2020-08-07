import '@cstyles/overlays/settings';
import React from 'react';
import OverlayContainer from '../container';

import { TabbedMenu, TabbedMenuViewType } from '@puddle/components';
import { Orientation } from '@puddle/utils/types'
import { ClientContext, AsyncButton } from '@puddle/components';

import {
  TorrentsView, NetworkView, SpeedView,
  PeersView, PuddleView
} from './views';

enum SettingsFields {
  TORRENTS = 'torrents',
  SPEED = 'speed',
  PEERS = 'peers',
  NETWORK = 'network',
  PUDDLE = 'puddle',
}

/* eslint-disable react/display-name */
const SETTINGS_FIELDS_VIEWS: { [key in SettingsFields]: TabbedMenuViewType } = {
  [SettingsFields.TORRENTS]: {
    key: 'Torrents',
    children: () => <TorrentsView />
  },
  [SettingsFields.SPEED]: {
    key: 'Speed',
    children: () => <SpeedView />
  },
  [SettingsFields.PEERS]: {
    key: 'Peers',
    children: () => <PeersView />
  },
  [SettingsFields.NETWORK]: {
    key: 'Network',
    children: () => <NetworkView />
  },
  [SettingsFields.PUDDLE]: {
    key: 'Puddle',
    children: () => <PuddleView />
  },
}

export default function Settings() {
  const onSubmit = () => {}
  const removeOverlay = () => {}

  return (
    <OverlayContainer>
      <div className={`modal settings`}>
        <header>
          <h1>Settings</h1>
        </header>

        <TabbedMenu
          orientation={Orientation.VERTICAL}
          active={SettingsFields.TORRENTS}
          views={SETTINGS_FIELDS_VIEWS} />
      </div>
    </OverlayContainer>
  )
}
