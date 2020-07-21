import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCog, faRss, faSignOutAlt, faDownload, faCheck, faBan, faExclamation, faPlay, faStop, faAsterisk
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import SideBarFilter, { FilterItemType } from './filters';
import TooltipButton from '../tooltip';
import Search from './search';

import './styles/index';

interface SidebarStateType {
  statusFilters: FilterItemType[]
}

export default class Sidebar extends React.Component<any, SidebarStateType> {
  constructor(props) {
    super(props)
    this.state = {
      statusFilters: [
        {icon: faAsterisk, title: 'All'},
        {icon: faDownload, title: 'Downloading'},
        {icon: faCheck, title: 'Complete'},
        {icon: faStop, title: 'Stopped'},
        {icon: faPlay, title: 'Active'},
        {icon: faBan, title: 'Inactive'},
        {icon: faExclamation, title: 'Error'},
      ]
    }
  }

  render() {
    return (
      <aside id="sidebar">
        <div className="buttons">
          <TooltipButton icon={faRss} tooltip="Speed Limits" />
          <TooltipButton icon={faCog} tooltip="Settings" />
          <TooltipButton icon={faBell} tooltip="Notifications" />
          <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
        </div>

        <Search/>
        <SideBarFilter title="Filter by Status" items={this.state.statusFilters} />
        <SideBarFilter title="Filter by Tracker" items={[]} />
      </aside>
    );
  }
}
