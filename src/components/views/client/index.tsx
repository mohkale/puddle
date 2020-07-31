import './styles';
import React, { useEffect, useRef } from 'react';

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
  useEffect(() => startUpdater(props.transmission), [])
  useEffect(() => rootRef?.current?.focus(), [])

  // {this.state.overlay &&
  //   <OverlayMenu render={this.state.overlay as React.ReactChild}
  //                onClick={() => this.setState({overlay: undefined})} />}

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


