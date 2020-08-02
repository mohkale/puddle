import React from 'react';
import { useDispatch } from 'react-redux';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@puddle/components';

import { overlayAssigned, OverlayKind } from '@puddle/stores';

export function SettingsButton() {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(overlayAssigned({
      kind: OverlayKind.SETTINGS,
    }))
  }

  return (
    <TooltipButton icon={faCog} tooltip="Settings" onClick={onClick} />
  );
}
