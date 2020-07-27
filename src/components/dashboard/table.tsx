import React, { useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import DashboardTableColumns from './table-header';
import DashboardTableBody from './table-body';

export default function DashboardTable() {
  const torrentsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const onScroll = (e) => {
    if (headerRef.current) {
      headerRef.current.style.left = `-${e.scrollLeft}px`
    }
  }

  return (
    <div id="torrents" ref={torrentsRef} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* The Table Header and the Table Body are wrapped into their own divs, so
          their widths don't influence each other. This way #torrents will have a
          fixed width that can be scrolled independent of the contents. */}
      <div>
        <DashboardTableColumns ref={headerRef} parentRef={torrentsRef} />
      </div>

      <Scrollbar onScroll={onScroll}>
        <DashboardTableBody/>
      </Scrollbar>
    </div>
  );
}
