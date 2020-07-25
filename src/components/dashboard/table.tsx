import React, { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import DashboardTableColumns from './table-header';
import DashboardTableBody from './table-body';

export default function DashboardTable() {
  const torrentsRef = useRef<HTMLDivElement>(null)

  return (
    <Scrollbars className="scrollbars">
      <div id="torrents" ref={torrentsRef}>
        <DashboardTableColumns torrentsRef={torrentsRef} />
        <DashboardTableBody/>
      </div>
    </Scrollbars>
  );
}
