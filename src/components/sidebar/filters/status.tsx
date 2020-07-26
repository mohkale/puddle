import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@puddle/stores';
import { filterUpdated } from '@puddle/stores/torrent-store';

import {
  torrentState, PuddleTorrentStates, PuddleTorrentStateFlags
} from '@puddle/utils/filters/status';

import FilterList, { FilterListBadge } from './filter-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faAsterisk, faDownload, faCheck, faStop, faPlay, faTimes, faBan
} from '@fortawesome/free-solid-svg-icons';

interface StatusSetting {
  icon: IconDefinition
  title: string
}

const statusSettings: { [key in PuddleTorrentStates]: StatusSetting } = {
  [PuddleTorrentStates.ALL]: {
    icon: faAsterisk, title: "All"
  },
  [PuddleTorrentStates.DOWNLOADING]: {
    icon: faDownload, title: "Downloading"
  },
  [PuddleTorrentStates.COMPLETE]: {
    icon: faCheck, title: "Complete"
  },
  [PuddleTorrentStates.STOPPED]: {
    icon: faStop, title: "Stopped"
  },
  [PuddleTorrentStates.ACTIVE]: {
    icon: faPlay, title: "Active"
  },
  [PuddleTorrentStates.INACTIVE]: {
    icon: faBan, title: "Inactive"
  },
  [PuddleTorrentStates.ERROR]: {
    icon: faTimes, title: "Error"
  },
}

export default function StatusFilters() {
  const dispatch = useDispatch()
  const statuses = useSelector((state: RootState) => state.torrents.byStatus)
  const activeState = useSelector((state: RootState) => state.torrents.filters.state)

  const statusEntries = Object.entries(statuses)
    .map(([statusString, torrents]) => {
      const status = Number(statusString)
      const settings = statusSettings[status]
      const classes = ["filter", activeState === status ? 'active' : '']

      const onClick = () => {
        if (activeState !== status) {
          dispatch(filterUpdated({ status: status }))
        }
      }

      return (
        <li key={status} className={classes.join(' ')} onClick={onClick}>
          <FontAwesomeIcon icon={settings.icon} className="icon" />
          {settings.title}
          <FilterListBadge num={torrents.length}/>
        </li>
      )
    })

  return <FilterList title="Filter by Status">{statusEntries}</FilterList>
}

