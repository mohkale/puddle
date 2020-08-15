import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faFeather } from '@fortawesome/free-solid-svg-icons';

import {
  altSpeedToggled, selectAltSpeedEnabled, notifyRequestError
} from '@client/stores';
import { ClientContext, TooltipButton } from '@client/components';

export function ToggleAltSpeedButton() {
    const dispatch = useDispatch()
    const { transmission } = useContext(ClientContext)
    const isActive = useSelector(selectAltSpeedEnabled);

    const onClick = async () => {
      try {
        await transmission.setSession({'alt-speed-enabled': !isActive})
        dispatch(altSpeedToggled({ value: !isActive }))
      } catch (err) {
        await dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err.toString(), description: 'toggling alt-speed'
        }))
      }
    }

    return (
        <TooltipButton
          className={isActive ? 'selected' : ''}
          onClick={onClick}
          icon={faFeather}
          tooltip={`${isActive ? 'Disable' : 'Enable'} Alt Speed`} />
    );
}


