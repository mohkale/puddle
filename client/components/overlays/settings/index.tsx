import '@cstyles/overlays/settings';
import React from 'react';

import { Orientation } from '@client/utils/types'
import { TabbedMenu, TabbedMenuViewType } from '@client/components';

import Modal from '../modal';

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
  return (
    <Modal title="Settings" className="settings">
      <TabbedMenu
        orientation={Orientation.VERTICAL}
        active={SettingsFields.TORRENTS}
        views={SETTINGS_FIELDS_VIEWS} />
    </Modal>
  )
}
