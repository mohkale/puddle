import React from 'react';
import { useDispatch } from 'react-redux';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@client/components';

import { settingsOverlayAssigned } from '@client/stores';

export function SettingsButton() {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(settingsOverlayAssigned())
  }

  return (
    <TooltipButton icon={faCog} tooltip="Settings" onClick={onClick} />
  );
}
