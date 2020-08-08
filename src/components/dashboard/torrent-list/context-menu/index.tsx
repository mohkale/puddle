import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectSelectedTorrentIds } from '@puddle/stores';

import {
  StartTorrentsItem, StopTorrentsItem, RemoveTorrentsItem,
  CheckHashesItem, SetLabelsItem, SetTorrentLocationItem,
  DetailsItem, PriorityItem, MoveToTopItem, MoveToBottomItem,
  MoveUpItem, MoveDownItem, CopyMagnetLinkItem
} from './items';

export interface ContextMenuProps {
  location: [number, number]
  cancel: VoidFunction
}

export default function ContextMenu(props: ContextMenuProps) {
  const selectedTorrents = useSelector(selectSelectedTorrentIds)
  const overlayRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (selectedTorrents.length === 0) {
      props.cancel()
    }
  })

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!overlayRef) {
      console.warn('context menu overlay ref is unassigned');
      return
    }

    props.cancel() // if you want to prevent this, use e.stopPropogation();
  }

  return (
    <div ref={overlayRef} className="context-menu" onClick={onClick} onContextMenu={onClick}>
      <ul className="menu" style={{ left: props.location[0], top: props.location[1] }}>
        <StartTorrentsItem torrents={selectedTorrents} />
        <StopTorrentsItem torrents={selectedTorrents} />
        <RemoveTorrentsItem torrents={selectedTorrents} />
        <CopyMagnetLinkItem torrents={selectedTorrents} />
        <CheckHashesItem torrents={selectedTorrents} />
        <li className="seperator"></li>
        <SetLabelsItem torrents={selectedTorrents} />
        <SetTorrentLocationItem torrents={selectedTorrents} />
        <li className="seperator"></li>
        <MoveToTopItem torrents={selectedTorrents} />
        <MoveUpItem torrents={selectedTorrents} />
        <MoveDownItem torrents={selectedTorrents} />
        <MoveToBottomItem torrents={selectedTorrents} />
        <li className="seperator"></li>
        <DetailsItem torrents={selectedTorrents} />
        <PriorityItem torrents={selectedTorrents} />
      </ul>
    </div>
  );
}
