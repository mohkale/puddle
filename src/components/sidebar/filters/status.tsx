import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@puddle/stores';

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
  const statuses = useSelector((state: RootState) => state.torrents.byStatus)
  const statusEntries = Object.entries(statuses)
    .map(([status, torrents]) => {
      const settings = statusSettings[status]
      return (
        <li key={status} className="filter">
          <FontAwesomeIcon icon={settings.icon!} className="icon" />
          {settings.title}
          <FilterListBadge num={torrents.length}/>
        </li>
      )
    })

  return <FilterList title="Filter by Status">{statusEntries}</FilterList>
}

