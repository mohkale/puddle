import '@cstyles/sidebar';
import React from 'react';

import Filters from './filters';
import NetworkGraph from './graph'

import {
  SettingsButton, ToggleAltSpeedButton, NotificationsButton,
  LogoutButton, StatisticsButton
} from './buttons';

interface SidebarProps {
  searchRef: React.MutableRefObject<HTMLInputElement|undefined>
}

export default function Sidebar(props: SidebarProps) {
  return (
    <aside id="sidebar">
      <div className="sidebar__buttons">
        <SettingsButton />
        <StatisticsButton />
        <ToggleAltSpeedButton />
        <NotificationsButton />
        <LogoutButton />
      </div>

      <NetworkGraph />
      <Filters {...props} />
    </aside>
  );
}
