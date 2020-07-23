import React, { Fragment, ReactChild } from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';

import { defaultTheme, setTheme } from '../puddle/theme';
import OverlayMenu from './overlays/menu';
import AppContext from './app-context';

import Transmission from '@puddle/transmission';
import TorrentResponse from '@puddle/transmission/responses/torrent';

import TorrentColumns, { defaultTorrentColumns } from '@puddle/components/columns';

interface AppState {
  overlay?: ReactChild,
  transmission: Transmission,
  columns: TorrentColumns
  torrents: Partial<TorrentResponse>[]
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
      torrents: []
    };

    (async () => {
      this.fetchTorrents()
      setInterval(() => this.fetchTorrents(), 1000)
    })()
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
        <Dashboard columns={this.state.columns}
                   torrents={this.state.torrents}
                   resizeColumn={this.resizeColumn}
        />
      </AppContext.Provider>
    );
  }

  fetchTorrents() {
    this.state.transmission.torrents(undefined, ...this.state.columns.fields)
      .then(torrents => this.setState({torrents: torrents}))
      // .then(() => console.log('fetching'))
  }

  resizeColumn = (column: number, delta: number) => {
    const newColumns = this.state.columns.clone()
    newColumns.activeColumns[column].width += delta
    this.setState({columns: newColumns})
  }
}
