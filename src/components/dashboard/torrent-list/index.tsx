import '@cstyles/torrent-list';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import Torrent from './torrent';
import TorrentsHeader from './header';
import ContextMenu, { ContextMenuProps } from './context-menu';
import ColumnResizer, { ColumnResizeContext } from './resize';

import {
  TorrentFields, columnResized, selectFilteredTorrents,
} from '@puddle/stores';

import { NotificationList } from '@puddle/components/notifications';

/*
 * Push the context menu by this much before rendering.
 */
const CONTEXT_MENU_OFFSET: [number, number] = [-10, 10];

export default function TorrentList() {
  const dispatch = useDispatch()

  const rootRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLUListElement>(null)

  const torrents = useSelector(selectFilteredTorrents)
  const [resizing, setResizing] = React.useState<ColumnResizeContext>()
  const [contextMenu, setContextMenu] = React.useState<Pick<ContextMenuProps, 'location'>>()

  const onResizeStart = (e: Pick<ColumnResizeContext, 'field' | 'startPos' | 'minPos'>) => {
    if (!bodyRef.current || !rootRef.current)
      return
    const rootBounds = rootRef.current!.getBoundingClientRect()
    const bodyBounds = bodyRef.current!.getBoundingClientRect()
    setResizing({
      ...e,
      startPos: e.startPos - rootBounds.left,
      delta: rootBounds.left,
      minPos: e.minPos - ((2 * rootBounds.left) - bodyBounds.left),
    })
  }

  const onScroll = (e) => {
    // keep the list header in sync with the torrents list.
    if (headerRef.current) {
      headerRef.current.style.left = `-${e.scrollLeft}px`
    }
  }

  const startContextMenu = (e) => {
    e.preventDefault()

    if (!bodyRef.current || !rootRef.current)
      return
    const rootBounds = rootRef.current!.getBoundingClientRect()
    const bodyBounds = bodyRef.current!.getBoundingClientRect()

    const scrollOffset = bodyBounds.left - rootBounds.left

    setContextMenu({
      location: [
        e.clientX - rootBounds.left - scrollOffset + CONTEXT_MENU_OFFSET[0],
        e.clientY - bodyBounds.top + CONTEXT_MENU_OFFSET[1]
      ]
    })
  }

  const entries = torrents.map(id => (<Torrent key={id} id={id} onRightClick={startContextMenu} />))

  useEffect(() => {
    // bodyRef.current && bodyRef.current.focus()
    // console.log(bodyRef.current.focus())
  }, [])

  return (
    <div id="torrents" ref={rootRef} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* The list Header and the list Body are wrapped into their own divs, so
          their widths don't influence each other. This way #torrents will have a
          fixed width that can be scrolled independent of its contents. */}
      <div>
        <TorrentsHeader ref={headerRef} startResizing={onResizeStart} />
      </div>

      <Scrollbar onScroll={onScroll}>
        <ul ref={bodyRef} className="rows">
          {entries}

          <li>
            {contextMenu &&
              <ContextMenu {...contextMenu} cancel={() => setContextMenu(undefined)} />}
          </li>
        </ul>
      </Scrollbar>

      <NotificationList />

      {resizing &&
        <ColumnResizer ctx={resizing!} finish={(field: TorrentFields, delta: number) => {
          setResizing(undefined)
          dispatch(columnResized({ field, delta }))
        }} />}
    </div>
  );
}
