import React from 'react';
import { useDispatch } from 'react-redux';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { TooltipButton } from '@client/components';

import { notificationsOverlayAssigned } from '@client/stores';

export function NotificationsButton() {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(notificationsOverlayAssigned())
  }

  return (
    <TooltipButton icon={faBell} tooltip="Notifications" onClick={onClick} />
  );
}
