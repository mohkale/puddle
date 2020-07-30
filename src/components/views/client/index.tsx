import React, { useEffect } from 'react';

import Sidebar from '@puddle/components/sidebar';
import Dashboard from '@puddle/components/dashboard';
// import OverlayMenu from '@puddle/components/overlays/menu';

import Transmission from '@puddle/transmission';
import ClientViewContext from './context';

import store, {
  updateTorrents, syncStats, syncStatsLimits
} from '@puddle/stores';

const TORRENT_SYNC_INTERVAL = 2000;
const STATS_SYNC_SPEED_INTERVAL = 1000;
const STATS_SYNC_LIMIT_INTERVAL = 60000;

interface ClientViewProps {
  // overlay?: ReactChild
  transmission: Transmission
}

export default function Client(props: ClientViewProps) {
  let updateTorrentsTimeout, syncStatsTimeout, syncStatsLimitTimeout;
  useEffect(() => {
    const fetchTorrents = () =>
      updateTorrentsTimeout = setTimeout(() => {
        store.dispatch(updateTorrents(props.transmission))
          .then(fetchTorrents)
      }, TORRENT_SYNC_INTERVAL)

    const updateStats = () =>
      syncStatsTimeout = setTimeout(() => {
        store.dispatch(syncStats(props.transmission))
          .then(updateStats)
      }, STATS_SYNC_SPEED_INTERVAL)

    const updateStatsLimits = () =>
      syncStatsLimitTimeout = setTimeout(() => {
        store.dispatch(syncStatsLimits(props.transmission))
          .then(updateStatsLimits)
      }, STATS_SYNC_LIMIT_INTERVAL)

    fetchTorrents();
    updateStats();
    updateStatsLimits();

    return () => {
      updateTorrentsTimeout && clearTimeout(updateTorrentsTimeout)
      syncStatsTimeout && clearTimeout(syncStatsTimeout)
      syncStatsLimitTimeout && clearTimeout(syncStatsLimitTimeout)
    }
  }, [])

  // {this.state.overlay &&
  //   <OverlayMenu render={this.state.overlay as React.ReactChild}
  //                onClick={() => this.setState({overlay: undefined})} />}

  return (
    <ClientViewContext.Provider
      value={{
        transmission: props.transmission
      }}>
      <Sidebar />
      <Dashboard />
    </ClientViewContext.Provider>
  );
}


