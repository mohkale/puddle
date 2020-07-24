import React, { Fragment, ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

import { defaultTheme, setTheme } from '../puddle/theme';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

import Transmission, { TorrentId } from '@puddle/transmission';
import TorrentResponse from '@puddle/transmission/responses/torrent';

import TorrentColumns, { defaultTorrentColumns } from '@puddle/components/columns';
import StatusFilter  from './filter/status';
import TrackerFilter  from './filter/tracker';
import FilterList from '@puddle/components/filter/filter-list';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission,
  columns: TorrentColumns
  torrents: Partial<TorrentResponse>[]
  filters: FilterList<any>[]
}

export default class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props)
    setTheme(defaultTheme);
    const transmission = new Transmission(`${window.location.href}transmission`)
    console.log(transmission)
    this.state = {
      // overlay: <div className="overlay"></div>,
      transmission: transmission,
      columns: defaultTorrentColumns,
      torrents: [],
      filters: [new StatusFilter(), new TrackerFilter()],
    };

    (async () => {
      this.fetchTorrents()
      setInterval(() => this.fetchTorrents(), 1000)
    })()
  }

  render() {
    // trackers={Object.entries(this.state.trackers)
    // .map(o => ({ title: o[0], count: o[1] }))}
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
        <Dashboard columns={this.state.columns}
                   torrents={this.state.torrents.filter(
                     (torrent) => this.state.filters.reduce(
                       (acc, filter) => (acc && filter.filter(torrent)),
                       true as boolean))}
                   resizeColumn={this.resizeColumn}
        />
      </AppContext.Provider>
    );
  }

  /**
   * Fetch the updated list of torrents tied to the currently shown columns
   * and update the main application state.
   */
  fetchTorrents() {
    this.state.transmission.torrents(undefined, ...this.state.columns.fields)
      .then(torrents => {
        this.state.filters.map(filter => filter.updateTorrents(torrents))
        this.setState({
          torrents: torrents,
        })
      })
  }

  /**
   * Finish resizing the {@code column}'th column by {@code delta}
   * pixels.
   *
   * @param column the column that's being resized.
   * @param delta how many pixels to change {@code column}s width by.
   */
  resizeColumn = (column: number, delta: number) => {
    const newColumns = this.state.columns.clone()
    newColumns.activeColumns[column].width += delta
    this.setState({ columns: newColumns })
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
