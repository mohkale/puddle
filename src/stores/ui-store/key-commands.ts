import React from 'react';

export enum KeyCommand {
  SELECT_ALL_TORRENTS,
  DESELECT_ALL_TORRENTS,
  FOCUS_SEARCH,
  CANCEL,
  // CLEAR_FILTERS,
  // SELECT_NEXT_TORRENT,
  // SELECT_PREV_TORRENT,
  // SELECT_APPEND_NEXT_TORRENT,
  // SELECT_APPEND_PREV_TORRENT,
}

export function keyCommand(e: React.KeyboardEvent): KeyCommand|undefined {
  if (e.ctrlKey) {
    switch (e.key) {
      case 'a':
        return KeyCommand.SELECT_ALL_TORRENTS
      case 'd':
        return KeyCommand.DESELECT_ALL_TORRENTS
      case 'g':
        return KeyCommand.CANCEL
      case 's':
      case 'f':
        return KeyCommand.FOCUS_SEARCH
    }
  }
}
