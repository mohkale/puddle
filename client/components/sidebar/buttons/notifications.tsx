import React from 'react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { TooltipButton } from '@client/components';

export const NotificationsButton =
  () => <TooltipButton icon={faBell} tooltip="Notifications" />
