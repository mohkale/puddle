import React from 'react';
import Transmission from '@transmission';

/**
 * Shared context which will be inherited by every
 * subcomponent of the root application.
 */
interface ContextType {
  transmission: Transmission
}

/*
 * construct the actual context instance, all the value will
 * be provided at runtime, but we have to supply defaults to
 * keep the typescript compiler happy :/.
 */
const clientViewContext = React.createContext<ContextType>({
  // See [[https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue][here]]. So you have to supply a default value for
  // every entry in the context type... but evidently you
  // shouldn't put things in context that you can't give
  // a default for at compile time. Either way, I will
  // assign this by the time it gets consumed so bypass
  // type safety and set the default to null.
  transmission: null as unknown as Transmission,
})

export default clientViewContext;
