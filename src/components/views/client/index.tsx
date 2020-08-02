import '@cstyles/views/client';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';

import { selectIntervals } from '@puddle/stores';

import Sidebar from '@puddle/components/sidebar';
import Dashboard from '@puddle/components/dashboard';
// import OverlayMenu from '@puddle/components/overlays/menu';

import Transmission from '@puddle/transmission';
import ClientViewContext from './context';

import rootKeyHandler from './key-handler';
import startUpdater from './updater';

interface ClientViewProps {
  // overlay?: ReactChild
  transmission: Transmission
}

export default function Client(props: ClientViewProps) {
  const searchRef = useRef<HTMLInputElement>()
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => rootRef?.current?.focus(), [])
  const intervals = useSelector(selectIntervals)
  useEffect(() => {
    const stopUpdates = startUpdater(
      props.transmission, intervals.torrentsSync,
      intervals.speedSync, intervals.speedLimitsSync)

    return () => stopUpdates()
  }, [intervals])

  const onKeyPress = (e: React.KeyboardEvent) => {
    rootKeyHandler(e, { searchRef, rootRef })
  }

  return (
    <ClientViewContext.Provider
      value={{
        transmission: props.transmission
      }}>
      <div ref={rootRef} className="client-view" tabIndex={-1} onKeyDown={onKeyPress}>
        <Sidebar searchRef={searchRef} />
        <Dashboard />
      </div>
    </ClientViewContext.Provider>
  );
}


