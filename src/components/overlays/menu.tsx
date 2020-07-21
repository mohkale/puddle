import React from 'react';

import './styles';

interface OverlayProps {
  render: React.ReactChild | React.ReactChildren,
  onClick: () => void,
}

/**
 * A [[https://reactjs.org/docs/higher-order-components.html][higher order component]] to construct overlays. These
 * overlays display menus on top of the dashboard and other
 * components, and can be exited from by simply clicking off
 * to the side.
 */
export default class Overlay extends React.Component<OverlayProps> {
  render() {
    return (
      <div className="overlay-container" onClick={this.exit}>
        {this.props.render}
      </div>
    )
  }

  exit = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      this.props.onClick();
    }
  }
}
