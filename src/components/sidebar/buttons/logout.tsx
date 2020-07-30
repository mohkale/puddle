import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@puddle/components';

export const LogoutButton =
  () => <TooltipButton icon={faSignOutAlt} tooltip="Logout" />
