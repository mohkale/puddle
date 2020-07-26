import React, { Fragment, ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

import { defaultTheme, setTheme } from '../puddle/theme';
import Transmission, { TorrentId } from '@puddle/transmission';

import store from '@puddle/stores';
import { updateTorrents, syncTorrents } from '@puddle/stores/torrent-store';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission,
}

export default class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props)
    setTheme(defaultTheme);
    const transmission = new Transmission(`${window.location.href}transmission`)
    this.state = {
      // overlay: <div className="overlay"></div>,
      transmission: transmission,
    };

    store.dispatch(syncTorrents(transmission, () => this.fetchTorrents()))
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          setOverlay: (el: ReactChild) => this.setState({overlay: el}),
          transmission: this.state.transmission
        }} >
        {this.state.overlay &&
          <OverlayMenu render={this.state.overlay as React.ReactChild}
                       onClick={() => this.setState({overlay: undefined})} />}
        <Sidebar />
        <Dashboard />
      </AppContext.Provider>
    );
  }

  fetchTorrents = () => {
    store.dispatch(
      updateTorrents(this.state.transmission,
                     () => setTimeout(this.fetchTorrents, 1000)),)
  }
}
