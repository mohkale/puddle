import React, { Fragment, ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

import { defaultTheme, setTheme } from '../puddle/theme';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

// TODO fix @puddle not working.
import Transmission from '../transmission';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission
}

export default class App extends React.PureComponent<any, AppState> {
  constructor(props) {
    super(props)
    setTheme(defaultTheme);
    this.state = {
      // overlay: <div className="overlay"></div>,
      transmission: new Transmission(`${window.location.href}transmission`)
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          setOverlay: (el: ReactChild) => this.setState({overlay: el})
        }} >
        {this.state.overlay &&
          <OverlayMenu render={this.state.overlay as React.ReactChild}
                       onClick={() => this.setState({overlay: undefined})} />}
        <Sidebar />
        <Dashboard />
      </AppContext.Provider>
    );
  }
}
