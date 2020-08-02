import '@cstyles/sidebar';
import React from 'react';

import Filters from './filters';
import NetworkGraph from './graph'

import {
  SpeedLimitsButton, SettingsButton,
  ToggleAltSpeedButton, NotificationsButton,
  LogoutButton
} from './buttons';

interface SidebarProps {
  searchRef: React.MutableRefObject<HTMLInputElement|undefined>
}

export default function Sidebar(props: SidebarProps) {
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
      <Filters {...props} />
    </aside>
  );
}
