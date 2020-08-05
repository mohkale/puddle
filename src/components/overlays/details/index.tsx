import '@cstyles/overlays/details';
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import store, {
  intervalsUpdated, selectIntervals,
  selectTorrentDetailsTorrentAssigned,
  updateTorrentDetails
} from '@puddle/stores'

import Header from './header';
import OverlayContainer from '../container';
import { FilesView, PeersView, DetailsView, TrackersView } from './views';

import { Updater } from '@puddle/utils'
import { TORRENT_DETAILED_FIELDS } from '@puddle/models';
import { ClientContext, TabbedMenu, TabbedMenuViewType } from '@puddle/components';

const VIEW_DETAILS_INTERVAL = 1000

enum DetailsFields {
  DETAILS = "torrent-details",
  FILES = "torrent-files",
  PEERS = "torrent-peers",
  TRACKERS = "torrent-trackers",
  // MEDIA_INFO
}

/* eslint-disable react/display-name */
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

  useEffect(() => {
    const updater =
      new Updater(() => store.dispatch(updateTorrentDetails(transmission)),
                  VIEW_DETAILS_INTERVAL)
    updater.start()
    return () => { updater.stop() }
  }, [])

  const isTorrentAssigned = useSelector(selectTorrentDetailsTorrentAssigned)

  if (!isTorrentAssigned) {
    return null
  }

  return (
    <OverlayContainer>
      <div className={`modal torrent-details`}>
        <Header />
        <TabbedMenu active={DetailsFields.DETAILS} views={TORRENT_DETAILS_VIEWS} />
      </div>
    </OverlayContainer>
  )
}
