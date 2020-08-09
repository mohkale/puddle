import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@client/components';

export const LogoutButton =
  () => <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
