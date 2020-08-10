import { useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';

import { selectOverlay, selectIntervals } from '@client/stores';

import Sidebar from '@client/components/sidebar';
import Dashboard from '@client/components/dashboard';
import Overlay from '@client/components/overlays';

import Transmission from '@transmission/client';
import ClientViewContext from './context';

import rootKeyHandler from './key-handler';
import startUpdater from './updater';

interface ClientViewProps {
  transmission: Transmission
}

// apply to wrap a bunch of inline items without modifying their
// own stylings.
const WRAPPER_STYLES = {
  display: 'flex', width: '100%', height: '100%'
}

export default function Client(props: ClientViewProps) {
  const searchRef = useRef<HTMLInputElement>()
  const rootRef = useRef<HTMLDivElement>(null)
  const intervals = useSelector(selectIntervals)
  useEffect(() => {
    const stopUpdates = startUpdater(
      props.transmission, intervals.torrentsSync,
      intervals.speedSync, intervals.speedLimitsSync)

    return () => stopUpdates()
  }, [intervals])
  useEffect(() => rootRef?.current?.focus(), [])
  const overlay = useSelector(selectOverlay)

  const onKeyPress = (e: React.KeyboardEvent) => {
    rootKeyHandler(e, { searchRef, rootRef })
  }

  return (
    <ClientViewContext.Provider
      value={{
        transmission: props.transmission
      }}>
      {overlay !== undefined &&
        <Overlay type={overlay} />}
      <div ref={rootRef} className="client-view" tabIndex={-1} onKeyDown={onKeyPress}
           style={{...WRAPPER_STYLES, outline: 'none'}} >
        <div className="client-root" style={WRAPPER_STYLES}>
          <Sidebar searchRef={searchRef} />
          <Dashboard />
        </div>
      </div>
    </ClientViewContext.Provider>
  );
}
