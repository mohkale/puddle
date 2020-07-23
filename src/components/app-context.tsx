import React, { ReactChild } from 'react';
import Transmission from '../transmission';

/**
 * Shared context which will be inherited by every
 * subcomponent of the root application.
 */
export interface AppContextType {
  setOverlay: (el: ReactChild) => void,
  transmission?: Transmission
}

function fallbackHandler(funcName) {
  return () => console.error(`${funcName} has not been provided.`);
}

/*
 * construct the actual context instance, all the value will
 * be provided at runtime, but we have to supply defaults to
 * keep the typescript compiler happy :/.
 */
const appContext = React.createContext<AppContextType>({
  setOverlay: fallbackHandler('setOverlay'),
})

export default appContext;
