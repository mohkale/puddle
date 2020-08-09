import React from 'react'

import store, {
  keyCommand, KeyCommand,
  allTorrentsSelected,
  allTorrentsDeselected,
} from '@client/stores';

interface RootKeyHandlerProps {
  searchRef: React.MutableRefObject<HTMLInputElement|undefined>
  rootRef: React.RefObject<HTMLDivElement>
}

/**
 * Top
 */
export default function rootKeyHandler(e: React.KeyboardEvent, {
  searchRef, rootRef
}: RootKeyHandlerProps) {
  const command = keyCommand(e);
  if (command === undefined)
    return

  e.preventDefault();

  switch (command! as KeyCommand) {
    case KeyCommand.SELECT_ALL_TORRENTS:
      store.dispatch(allTorrentsSelected)
      break
    case KeyCommand.DESELECT_ALL_TORRENTS:
      store.dispatch(allTorrentsDeselected())
      break
    case KeyCommand.FOCUS_SEARCH:
      if (!searchRef.current) {
        console.warn('search bar reference is unassigned');
        return
      }

      searchRef.current!.focus()
      break
    case KeyCommand.CANCEL:
      if (!rootRef.current) {
        console.warn('root view element is unassigned');
        return
      }

      rootRef.current.focus()
      break;
  }
}
