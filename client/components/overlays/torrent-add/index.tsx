import '@cstyles/overlays/torrent-add';
import React from 'react';

import { Orientation } from '@client/utils/types'
import { TabbedMenu, TabbedMenuViewType } from '@client/components';

import { ByUrl } from './views/by-url';
import { ByFile } from './views/by-file';
import OverlayContainer from '../container';

enum TorrentAddFields {
  BY_URL  = 'by-url',
  BY_FILE = 'by-file'
}

/* eslint-disable react/display-name */
const TORRENT_ADD_FIELDS_VIEWS: { [key in TorrentAddFields]: TabbedMenuViewType } = {
  [TorrentAddFields.BY_URL]: {
    key: 'By URL',
    children: () => <ByUrl />
  },
  [TorrentAddFields.BY_FILE]: {
    key: 'By File',
    children: () => <ByFile />
  },
}

export default function TorrentAdd() {
  return (
    <OverlayContainer>
      <div className={`modal torrent-add`}>
        <header>
          <h1>Add Torrent</h1>
        </header>

        <div className="modal-body">
          <TabbedMenu
            orientation={Orientation.VERTICAL}
            active={TorrentAddFields.BY_URL}
            views={TORRENT_ADD_FIELDS_VIEWS} />
        </div>
      </div>
    </OverlayContainer>
  )
}
