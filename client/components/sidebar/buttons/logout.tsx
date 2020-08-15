import React from 'react';
import { useDispatch } from 'react-redux';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TooltipButton } from '@client/components';
import { forget } from '@server/api';

import { viewChanged, ViewType, notifyRequestError } from '@client/stores';

export function LogoutButton() {
  const dispatch = useDispatch()
  const onClick = async () => {
    try {
      const ok = await forget()
      if (!ok) throw 'failed to forget current users session.'
      dispatch(viewChanged({type: ViewType.SIGN_IN}))
    } catch (err) {
      dispatch(notifyRequestError({
        to: 'puddle', errorMessage: err, description: 'forgetting users session'
      }))
    }
  }
  return <TooltipButton icon={faSignOutAlt} tooltip="Logout" onClick={onClick} />;
}
