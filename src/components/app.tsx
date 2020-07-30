import React, { useState, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultTheme, setTheme } from '../puddle/theme';

import LoginView from './views/login';
import LoadingView from './views/loading';

import Transmission, { TransmissionSerialised } from '@puddle/transmission';

import store, {
  syncTorrents, syncStats, syncStatsLimits, selectCurrentView, ViewType
} from '@puddle/stores';

setTheme(defaultTheme);

const ClientView = React.lazy(() => import('./views/client'))

export default function App() {
  const { type: viewType, ...props } = useSelector(selectCurrentView)
  switch (viewType) {
    case ViewType.SIGN_IN:
      return <LoginView {...props} setTransmission={() => {}} />;
    case ViewType.LOADING:
      return <LoadingView {...props} />;
    case ViewType.CLIENT:
      // We're bypassing typesafety for view states because homogenous
      // view types would be a pain to parse/interpret. I'll have to
      // come back to this.
      const transmission = Transmission.fromSerialised(
        props['transmission'] as TransmissionSerialised)

      return (
        <Suspense fallback={<LoadingView />}>
          <ClientView transmission={transmission} />
        </Suspense>
      );
  }
}
