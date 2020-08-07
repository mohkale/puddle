import React from 'react';

import { useDispatch } from 'react-redux';
import { overlayRemoved } from '@puddle/stores';

/**
 * A [[https://reactjs.org/docs/higher-order-components.html][higher order component]] to construct overlays. These
 * overlays display menus on top of the dashboard and other
 * components, and can be exited from by simply clicking off
 * to the side.
 */
export default function OverlayContainer(props) {
  const dispatch = useDispatch()

  const onClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(overlayRemoved())
    }
  }

  return (
    <div className="overlay-container" onMouseDown={onClick}>
      {props.children}
    </div>
  )
}
