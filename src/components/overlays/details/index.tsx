import '@cstyles/overlays/details';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store, { OverlayType, selectTorrentDetailsOverlayTorrentId, selectTorrentById, intervalsUpdated, selectIntervals, torrentDetailsOverlayTorrentUpdated, selectTorrentDetailsOverlayTorrent } from '@puddle/stores'
import OverlayContainer from '../container';
import { ClientContext } from '@puddle/components';
import Header from './header';
import { torrentClasses } from '@puddle/components/dashboard/torrent-list/torrent';
import { TabbedMenu, TabbedMenuViewType } from '@puddle/components';
import { FilesView, PeersView, DetailsView, TrackersView } from './views';
import { updateTorrentDetails } from '@puddle/stores';
import { TorrentDetailed, TORRENT_DETAILED_FIELDS, torrentDetailedFromResponse as torrentFromResponse } from '@puddle/models';
import { TorrentDetailsContext } from './context';
import { Updater } from '@puddle/utils'

const VIEW_DETAILS_INTERVAL = 1000

enum DetailsFields {
  DETAILS = "torrent-details",
  FILES = "torrent-files",
  PEERS = "torrent-peers",
  TRACKERS = "torrent-trackers",
  // MEDIA_INFO
}

const TORRENT_DETAILS_VIEWS: { [key in DetailsFields]: TabbedMenuViewType } = {
  [DetailsFields.DETAILS]: {
    key: "Details",
    children: () => <DetailsView />,
  },
  [DetailsFields.FILES]: {
    key: "Files",
    children: () => <FilesView />
  },
  [DetailsFields.TRACKERS]: {
    key: 'Trackers',
    children: () => <TrackersView />
  },
  [DetailsFields.PEERS]: {
    key: 'Peers',
    children: () => <PeersView />
  }
}

export default function TorrentDetails() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const torrent = useSelector(selectTorrentDetailsOverlayTorrent)
  const originalIntervals = useSelector(selectIntervals)

  const torrentId = useSelector(selectTorrentDetailsOverlayTorrentId)

  // reduce the time durations of the background requests, so that
  // we can request information about the current torrent easily.
  useEffect(() => {
    dispatch(intervalsUpdated({
      torrentsSync: 40_000,
      speedSync: 100_000,
      speedLimitsSync: 100_000
    }))

    return () => { dispatch(intervalsUpdated(originalIntervals)) }
  }, [])

  // const [torrent, setTorrent] = useState<TorrentDetailed>()
  useEffect(() => {
    const updater =
      new Updater(() => store.dispatch(updateTorrentDetails(transmission, torrentId)),
                  VIEW_DETAILS_INTERVAL)
    updater.start()
    return () => { updater.stop() }
  }, [])

  if (torrent === undefined) {
    return null
  }

  const updateTorrent = (t: Partial<TorrentDetailed>) => {
    dispatch(torrentDetailsOverlayTorrentUpdated(Object.assign({}, torrent, t)))
  }

  return (
    <TorrentDetailsContext.Provider value={{torrent, updateTorrent}}>
      <OverlayContainer>
        <div className={`modal torrent-details`}>
          <Header torrentId={torrentId} />
          <TabbedMenu active={DetailsFields.DETAILS} views={TORRENT_DETAILS_VIEWS} />
        </div>
      </OverlayContainer>
    </TorrentDetailsContext.Provider>
  )
}
