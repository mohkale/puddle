import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@puddle/stores';
import { filterClassesUpdated } from '@puddle/stores';
import { TorrentClasses, selectTorrentByClassWithMeta } from '@puddle/stores';

import FilterList, { FilterListBadge } from './filter-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faAsterisk, faDownload, faCheck, faStop, faPlay, faTimes, faBan
} from '@fortawesome/free-solid-svg-icons';

interface ClassSetting {
  icon: IconDefinition
  title: string
}

const classSettings: { [key in TorrentClasses]: ClassSetting } = {
  [TorrentClasses.ALL]: {
    icon: faAsterisk, title: "All"
  },
  [TorrentClasses.DOWNLOADING]: {
    icon: faDownload, title: "Downloading"
  },
  [TorrentClasses.COMPLETE]: {
    icon: faCheck, title: "Complete"
  },
  [TorrentClasses.STOPPED]: {
    icon: faStop, title: "Stopped"
  },
  [TorrentClasses.ACTIVE]: {
    icon: faPlay, title: "Active"
  },
  [TorrentClasses.INACTIVE]: {
    icon: faBan, title: "Inactive"
  },
  [TorrentClasses.ERROR]: {
    icon: faTimes, title: "Error"
  },
}

export default function ClassFilters() {
  const dispatch = useDispatch()
  const [classes, activeClass] = useSelector(selectTorrentByClassWithMeta)

  const entries = Object.entries(classes)
    .map(([classKey, torrents]) => {
      const classVal = Number(classKey)
      const settings = classSettings[classVal]

      const onClick = () => {
        if (classVal !== activeClass) {
          dispatch(filterClassesUpdated(classVal))
        }
      }

      const classes = activeClass === classVal ? 'selected' : ''
      return (
        <li key={classKey} className={classes} onClick={onClick}>
          <FontAwesomeIcon icon={settings.icon} className="icon" />
          {settings.title}
          <FilterListBadge num={torrents.length}/>
        </li>
      )
    })

  return <FilterList title="Filter by Status">{entries}</FilterList>
}

