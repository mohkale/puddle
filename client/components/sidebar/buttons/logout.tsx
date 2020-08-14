import React from 'react';
import { useDispatch } from 'react-redux';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@client/components';
import { forget } from '@server/api';

import { viewChanged, ViewType } from '@client/stores';

export function LogoutButton() {
  const dispatch = useDispatch()
  const onClick = () => {
    // TODO handle error
    forget().then(ok => ok && dispatch(viewChanged({type: ViewType.SIGN_IN})))
  }
  return <TooltipButton icon={faSignOutAlt} tooltip="Logout" onClick={onClick} />;
}
