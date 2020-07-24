import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCog, faRss, faSignOutAlt, faDownload, faCheck, faBan, faExclamation, faPlay, faStop, faAsterisk
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import FilterList from '@puddle/components/filter/filter-list';
import SideBarFilterList from './filters';
import TooltipButton from '../tooltip';
import Search from './search';

import { Scrollbars } from 'react-custom-scrollbars';

import './styles/index';

interface SidebarPropsType {
  filters: FilterList<any>[]
  updateFilter(list: FilterList<any>, index: any): void
}

export default class Sidebar extends React.Component<SidebarPropsType> {
  render() {
    return (
      <aside id="sidebar">
        <div className="buttons">
          <TooltipButton icon={faRss} tooltip="Speed Limits" />
          <TooltipButton icon={faCog} tooltip="Settings" />
          <TooltipButton icon={faBell} tooltip="Notifications" />
          <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
        </div>

        <Scrollbars>
          <Search/>

          {this.props.filters.map(filter =>
            <SideBarFilterList key={filter.title}
                               updateFilter={this.props.updateFilter}
                               filter={filter} />)}
        </Scrollbars>
      </aside>
    );
  }
}
