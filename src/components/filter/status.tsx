import FilterList, { FilterListItemType as FilterItemType } from './filter-list';
import { TransmissionTorrentStatus } from '@puddle/transmission/responses/torrent';
import TorrentResponse from '@puddle/transmission/responses/torrent';

import {
  faCheck, faBan, faExclamation, faPlay,
  faStop, faAsterisk, faDownload,
} from '@fortawesome/free-solid-svg-icons';

const STATUS_FLAGS: { [key in TransmissionTorrentStatus]: number } = {
  [TransmissionTorrentStatus.STOPPED]       : 1 << 0,
  [TransmissionTorrentStatus.CHECK_WAIT]    : 1 << 1,
  [TransmissionTorrentStatus.CHECK]         : 1 << 2,
  [TransmissionTorrentStatus.DOWNLOAD_WAIT] : 1 << 3,
  [TransmissionTorrentStatus.DOWNLOAD]      : 1 << 4,
  [TransmissionTorrentStatus.SEED_WAIT]     : 1 << 5,
  [TransmissionTorrentStatus.SEED]          : 1 << 6
}

interface FilterExtensions {
  status?: number
  predicate?: (r: Partial<TorrentResponse>) => boolean
}

let filtersCounter = 0

export default class StatusFilter implements FilterList<number> {
  title = "Filter by Status"

  filters: (FilterItemType<number> & FilterExtensions)[] = [
    {
      icon: faAsterisk, title: 'All', id: filtersCounter++,
    },
    {
      icon: faDownload, title: 'Downloading', id: filtersCounter++,
      status: STATUS_FLAGS[TransmissionTorrentStatus.DOWNLOAD],
      predicate: (resp) => resp.rateDownload! > 0
    },
    {
      icon: faCheck, title: 'Complete', id: filtersCounter++,
      // WARN assumes only completed torrents are seeding.
      status: STATUS_FLAGS[TransmissionTorrentStatus.SEED] |
        STATUS_FLAGS[TransmissionTorrentStatus.SEED_WAIT]
    },
    {
      icon: faStop, title: 'Stopped', id: filtersCounter++,
      status: STATUS_FLAGS[TransmissionTorrentStatus.STOPPED]
    },
    {
      icon: faPlay, title: 'Active', id: filtersCounter++,
      status: STATUS_FLAGS[TransmissionTorrentStatus.CHECK] |
        STATUS_FLAGS[TransmissionTorrentStatus.DOWNLOAD] |
        STATUS_FLAGS[TransmissionTorrentStatus.SEED],
    },
    {
      icon: faBan, title: 'Inactive', id: filtersCounter++,
      status: STATUS_FLAGS[TransmissionTorrentStatus.STOPPED] |
        STATUS_FLAGS[TransmissionTorrentStatus.CHECK_WAIT] |
        STATUS_FLAGS[TransmissionTorrentStatus.DOWNLOAD_WAIT] |
        STATUS_FLAGS[TransmissionTorrentStatus.SEED_WAIT],
    },
  ]

  constructor() {
    this.activeFilter = 0;
  }

  private _activeFilter = 0
  get activeFilter() {
    return this._activeFilter
  }

  set activeFilter(val: number) {
    this.filters[this.activeFilter].active = false
    this.filters[val].active = true
    this._activeFilter = val
  }

  selectItem = (i: number) => {
    this.activeFilter = i
  }

  filter = (entry: Partial<TorrentResponse>): boolean =>
    this.checkFilter(this.filters[this.activeFilter], entry)

  private checkFilter = (filter: FilterExtensions, entry: Partial<TorrentResponse>) => {
    if (!filter.status) {
      return true
    } else {
      return (STATUS_FLAGS[entry.status!] & filter.status) !== 0 &&
        (filter.predicate === undefined || filter.predicate!(entry));
    }
  }

  updateTorrents = (torrents: Partial<TorrentResponse>[]) => {
    this.filters.map(filter => {
      filter.count = torrents.reduce((acc, torrent) => {
        if (this.checkFilter(filter, torrent))
          acc += 1
        return acc
      }, 0)
    })
  }
}

