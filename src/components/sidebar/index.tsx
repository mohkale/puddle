import './styles';
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCog, faRss, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faTurtle } from '@puddle/utils/fontawesome';

import AppContext from '@puddle/components/app-context';
import {
  altSpeedToggled, selectAltSpeedEnabled
} from '@puddle/stores';

import TooltipButton from '../tooltip';
import Filters from './filters';
import NetworkGraph from './graph'

function ToggleAltSpeedButton() {
  const dispatch = useDispatch()
  const { transmission } = useContext(AppContext)
  const isActive = useSelector(selectAltSpeedEnabled);

  const onClick = () => {
    if (transmission)
      // TODO make transmission non-nullable
      // TODO show notification when this fails
      transmission!.setSession({'alt-speed-enabled': !isActive})
        .then(() => dispatch(altSpeedToggled({ value: !isActive })))
  }

  return (
    <TooltipButton
      className={isActive ? 'active' : ''}
      onClick={onClick}
      icon={faTurtle}
      tooltip={`${isActive ? 'Disable' : 'Enabled'} Alt Speed`} />
  );
}

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="buttons">
        <TooltipButton icon={faRss} tooltip="Speed Limits" />
        <TooltipButton icon={faCog} tooltip="Settings" />
        <ToggleAltSpeedButton />
        <TooltipButton icon={faBell} tooltip="Notifications" />
        <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
      </div>

      <NetworkGraph />
      <Filters />
    </aside>
  );
}
