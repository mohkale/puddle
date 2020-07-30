import './index.scss';
import React from 'react';

import Filters from './filters';
import NetworkGraph from './graph'

import {
  SpeedLimitsButton, SettingsButton,
  ToggleAltSpeedButton, NotificationsButton,
  LogoutButton
} from './buttons';

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="buttons">
        <SpeedLimitsButton />
        <SettingsButton />
        <ToggleAltSpeedButton />
        <NotificationsButton />
        <LogoutButton />
      </div>

      <NetworkGraph />
      <Filters />
    </aside>
  );
}
