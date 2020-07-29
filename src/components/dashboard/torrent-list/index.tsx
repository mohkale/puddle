import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { Scrollbar } from 'react-scrollbars-custom';

import { selectFilteredTorrents } from '@puddle/stores';

import Torrent from './torrent';
import TorrentsHeader from './header';

export default function TorrentList() {
  const rootRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const torrents = useSelector(selectFilteredTorrents)

  const onScroll = (e) => {
    // keep the list header in sync with the torrents list.
    if (headerRef.current) {
      headerRef.current.style.left = `-${e.scrollLeft}px`
    }
  }

  const entries = torrents.map(id => (<Torrent key={id} id={id} />))

  return (
    <div id="torrents" ref={rootRef} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* The list Header and the list Body are wrapped into their own divs, so
          their widths don't influence each other. This way #torrents will have a
          fixed width that can be scrolled independent of its contents. */}
      <div>
        <TorrentsHeader ref={headerRef} parentRef={rootRef} />
      </div>

      <Scrollbar onScroll={onScroll}>
        <ul className="rows">{entries}</ul>
      </Scrollbar>
    </div>
  );
}

