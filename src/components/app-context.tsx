import React, { ReactChild } from 'react';

export interface AppContextType {
  setOverlay: (el: ReactChild) => void
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
