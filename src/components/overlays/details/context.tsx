import React from 'react';
import { TorrentFull } from './torrent-full';

export interface TorrentDetailsContextType {
  torrent: TorrentFull
  updateTorrent: (torrent: Partial<TorrentFull>) => void
}

export const TorrentDetailsContext =
  React.createContext<TorrentDetailsContextType>(
    null as unknown as TorrentDetailsContextType)
