import React from 'react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { TooltipButton } from '@puddle/components';

export const NotificationsButton =
  () => <TooltipButton icon={faBell} tooltip="Notifications" />
