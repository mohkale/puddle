import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faTurtle } from '@client/utils/fontawesome';

import {
    altSpeedToggled, selectAltSpeedEnabled
} from '@client/stores';
import { ClientContext, TooltipButton } from '@client/components';

export function ToggleAltSpeedButton() {
    const dispatch = useDispatch()
    const { transmission } = useContext(ClientContext)
    const isActive = useSelector(selectAltSpeedEnabled);

    const onClick = () => {
        if (transmission)
            // TODO show notification when this fails
            transmission.setSession({'alt-speed-enabled': !isActive})
                .then(() => dispatch(altSpeedToggled({ value: !isActive })))
    }

    return (
        <TooltipButton
          className={isActive ? 'selected' : ''}
          onClick={onClick}
          icon={faTurtle}
          tooltip={`${isActive ? 'Disable' : 'Enable'} Alt Speed`} />
    );
}


