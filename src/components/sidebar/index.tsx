import './styles';
import React from 'react';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCog, faRss, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import TooltipButton from '../tooltip';
import Filters from './filters';
import NetworkGraph from './graph'

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="buttons">
        <TooltipButton icon={faRss} tooltip="Speed Limits" />
        <TooltipButton icon={faCog} tooltip="Settings" />
        <TooltipButton icon={faBell} tooltip="Notifications" />
        <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
      </div>

      <NetworkGraph />
      <Filters />
    </aside>
  );
}
