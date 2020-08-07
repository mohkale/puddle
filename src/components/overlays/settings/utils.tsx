import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, selectSettingsSession } from '@puddle/stores'
import { TransmissionSession as Session } from '@puddle/transmission'

export function sessionSelector<T>(selector: (t: Session) => T) {
  return (state: RootState) =>
    selector(selectSettingsSession(state))
}

export function useStateFromSelector<T>(selector: (t: RootState) => T) {
  const defaultValue = useSelector(selector)
  return useState(defaultValue)
}
