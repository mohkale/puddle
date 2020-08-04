import React from 'react';
import { TorrentDetailed } from '@puddle/models';

export interface TorrentDetailsContextType {
  torrent: TorrentDetailed
  updateTorrent: (torrent: Partial<TorrentDetailed>) => void
}

export const TorrentDetailsContext =
  React.createContext<TorrentDetailsContextType>(
    null as unknown as TorrentDetailsContextType)
