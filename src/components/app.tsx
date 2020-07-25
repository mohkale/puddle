import React, { Fragment, ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

import { defaultTheme, setTheme } from '../puddle/theme';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

import Transmission, { TorrentId } from '@puddle/transmission';

import StatusFilter  from './filter/status';
import TrackerFilter  from './filter/tracker';
import FilterList from '@puddle/components/filter/filter-list';

import store from '@puddle/stores';
import { updateTorrents, syncTorrents } from '@puddle/stores/torrent';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission,
  filters: FilterList<any>[]
}

export default class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props)
    setTheme(defaultTheme);
    const transmission = new Transmission(`${window.location.href}transmission`)
    this.state = {
      // overlay: <div className="overlay"></div>,
      transmission: transmission,
      filters: [new StatusFilter(), new TrackerFilter()],
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
        <Sidebar filters={this.state.filters}
                 updateFilter={this.updateFilter} />
        <Dashboard />
      </AppContext.Provider>
    );
  }

  fetchTorrents = () => {
    store.dispatch(
      updateTorrents(this.state.transmission,
                     () => setTimeout(this.fetchTorrents, 1000)),)
  }

  /**
   * update one of the filters in our filter lists by selecting
   * the entry at {@code index}.
   *
   * Now we have to mark these as {@code any} and bypass typesafety,
   * because typescript doesn't support covariance yet, but the generic
   * type of {@code list} and {@code index} is guaranteed to be the same
   * due to {@code index} being defined in relation to {@code list}.
   */
  updateFilter = (list: FilterList<any>, index: any) => {
    list.selectItem(index, false)
    this.setState(this.state); // trigger rerender.
  }
}
