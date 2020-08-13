import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSelectedTorrentIds } from '@client/stores';

import {
  StartTorrentsItem, StopTorrentsItem, RemoveTorrentsItem,
  CheckHashesItem, SetLabelsItem, SetTorrentLocationItem,
  DetailsItem, PriorityItem, MoveToTopItem, MoveToBottomItem,
  MoveUpItem, MoveDownItem, CopyMagnetLinkItem
} from './items';

export interface ContextMenuProps {
  location: [number, number]
  cancel: VoidFunction
  rootRef: React.RefObject<HTMLElement>
  bodyRef: React.RefObject<HTMLElement>
}

export default function ContextMenu(props: ContextMenuProps) {
  const selectedTorrents = useSelector(selectSelectedTorrentIds)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contextMenuRef = useRef<HTMLUListElement>(null)
  const [location, setLocation] = useState(props.location);

  useEffect(() => {
    if (selectedTorrents.length === 0) {
      props.cancel()
    }
  })

  // make sure the context menu doesn't go outside of the scrollable region.
  useEffect(() => {
    if (!contextMenuRef.current || !props.rootRef.current || !props.bodyRef.current) {
      console.warn('context-menu refs not all assigned, skipping alignment')
      return
    }

    const { x: menuX, y: menuY, width: menuWidth, height: menuHeight } = contextMenuRef.current!.getBoundingClientRect()
    const { x: rootX, y: rootY, width: rootWidth, height: rootHeight } = props.rootRef.current!.getBoundingClientRect()
    const { x: bodyX, y: bodyY, width: bodyWidth, height: bodyHeight } = props.bodyRef.current!.getBoundingClientRect()

    // NOTE 25 is the height of the table torrent-list header/column-indicators
    const xDiff = Math.min(0, bodyWidth  + bodyX - menuX - menuWidth - 25)

    // yDiff has to account for the height of the torrent-list because the width
    // is constant. The context menu shouldn't be adjusted when the torrent-list
    // is really small.
    const yDiff = (bodyHeight + menuHeight < rootHeight) ?
      0 : Math.min(0, bodyHeight + bodyY - menuY - menuHeight - 25)

    setLocation([location[0] + xDiff, location[1] + yDiff])
  }, [])

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!overlayRef) {
      console.warn('context menu overlay ref is unassigned');
      return
    }

    props.cancel() // if you want to prevent this, use e.stopPropogation();
  }

  return (
    <div ref={overlayRef} className="context-menu" onClick={onClick} onContextMenu={onClick}
         style={{ width: props.bodyRef.current!.offsetWidth || '100%' }}>
      <ul ref={contextMenuRef} className="context-menu__menu" style={{ left: location[0], top: location[1] }}>
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
