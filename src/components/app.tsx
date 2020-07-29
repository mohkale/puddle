import React, { ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

import { defaultTheme, setTheme } from '../puddle/theme';
import Transmission from '@puddle/transmission';

import store, {
  updateTorrents, syncTorrents, syncStats, syncStatsLimits
} from '@puddle/stores';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission,
}

const TORRENT_SYNC_INTERVAL = 2000;
const STATS_SYNC_SPEED_INTERVAL = 1000;
const STATS_SYNC_LIMIT_INTERVAL = 60000;

export default class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props)
    setTheme(defaultTheme);
    const transmission = new Transmission(`${window.location.href}transmission`)
    this.state = {
      // overlay: <div className="overlay"></div>,
      transmission: transmission,
    };

    store.dispatch(syncTorrents(transmission))
      .then(() => this.fetchTorrents())
      .then(() => this.updateStats())
      .then(() => this.updateStatsLimits())
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

  fetchTorrents = () =>
    store.dispatch(updateTorrents(this.state.transmission))
      .then(() => setTimeout(this.fetchTorrents, TORRENT_SYNC_INTERVAL))


  updateStats = () =>
    store.dispatch(syncStats(this.state.transmission))
      .then(() => setTimeout(this.updateStats, STATS_SYNC_SPEED_INTERVAL))


  updateStatsLimits = () =>
    store.dispatch(syncStatsLimits(this.state.transmission))
      .then(() => setTimeout(this.updateStatsLimits, STATS_SYNC_LIMIT_INTERVAL))

}
