import React, { useState, Suspense } from 'react';
import { defaultTheme, setTheme } from '../puddle/theme';

import LoginView from './views/login';
import LoadingView from './views/loading';

import Transmission from '@puddle/transmission';

import store, {
  syncTorrents, syncStats, syncStatsLimits
} from '@puddle/stores';

setTheme(defaultTheme);

const ClientView = React.lazy(() => import('./views/client'))

interface AppState {
  loading?: boolean
  transmission?: Transmission
}

export default class App extends React.Component<any, AppState> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (!this.state.transmission) {
      return <LoginView setTransmission={this.setTransmission} />;
    } else if (this.state.loading) {
      return <LoadingView />
    } else {
      return (
        <Suspense fallback={<LoadingView />}>
          <ClientView transmission={this.state.transmission} />
        </Suspense>
      );
    }
  }

  private setTransmission = (t: Transmission) => {
    this.setState({
      transmission: t,
      loading: true,
    })

    // used for debugging, TODO remove
    const wait = new Promise(res => {
      // setTimeout(res, 500)
      res()
    })

    const setupPromise = store.dispatch(syncTorrents(t))
      .then(() => store.dispatch(syncStats(t)))
      .then(() => store.dispatch(syncStatsLimits(t)))

    Promise.all([wait, setupPromise])
      .then(() => {
        this.setState({ loading: false })
      })
  }
}
