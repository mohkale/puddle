import '@cstyles/overlays/details';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayType, selectTorrentDetailsOverlayTorrentId, selectTorrentById, intervalsUpdated, selectIntervals } from '@puddle/stores'
import OverlayContainer from '../container';
import { ClientContext } from '@puddle/components';
import Header from './header';
import { torrentClasses } from '@puddle/components/dashboard/torrent-list/torrent';
import { TabbedMenu, TabbedMenuViewType } from '@puddle/components';
import { FilesView, PeersView, DetailsView, TrackersView } from './views';
import { TorrentFull, fromResponse as torrentFromResponse, TORRENT_FULL_FIELDS } from './torrent-full';
import { TorrentDetailsContext } from './context';

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
  const [torrent, setTorrent] = useState<TorrentFull>()
  useEffect(() => {
    let timeoutId: number|undefined

    const updateTorrentInInterval = () => {
      transmission.torrent(torrentId, ...TORRENT_FULL_FIELDS)
        .then(torrent => {
          setTorrent(torrentFromResponse(torrent))
          timeoutId = setTimeout(updateTorrentInInterval, VIEW_DETAILS_INTERVAL)
        })
    }

    updateTorrentInInterval()

    return () => { timeoutId && clearTimeout(timeoutId) }
  }, [])

  if (torrent === undefined) {
    return null
  }

  const updateTorrent = (t: Partial<TorrentFull>) => {
    setTorrent(Object.assign({}, torrent, t))
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
