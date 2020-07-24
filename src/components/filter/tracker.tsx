import FilterList, { FilterListItemType as FilterItemType } from './filter-list';
import TorrentResponse from '@puddle/transmission/responses/torrent';
import { extractHostname } from '@puddle/utils';

export default class TrackerFilter implements FilterList<string> {
  title = "Filter by Trackers"
  private activeTrackers: Set<string> = new Set()

  private trackers: { [key: string]: number } = {}

  get filters(): FilterItemType<string>[] {
    return Object.entries(this.trackers).map(([tracker, count]) => {
      return {
        id: tracker,
        title: tracker,
        count: count,
        active: this.activeTrackers.has(tracker),
      }
    })
  }

  selectItem = (i: string) => {
    const isActive = this.activeTrackers.has(i)
    this.activeTrackers.clear()

    // by default, toggles if active element clicked again.
    if (!isActive) {
      this.activeTrackers.add(i)
    }
  }

  filter = (entry: Partial<TorrentResponse>): boolean => {
    if (this.activeTrackers.size === 0) {
      return true
    } else {
      return entry.trackers!
        .map(tracker => extractHostname(tracker.announce))
        .find(el => this.activeTrackers.has(el)) !== undefined
    }
  }

  updateTorrents = (torrents: Partial<TorrentResponse>[]) => {
    this.trackers = torrents.reduce((acc, torrent) => {
      torrent.trackers!.map(tracker => {
        const trackerHost = extractHostname(tracker.announce);
        if (acc[trackerHost]) {
          acc[trackerHost] += 1
        } else {
          acc[trackerHost] = 1
        }
      })
      return acc
    }, {} as { [key: string]: number })

    // TODO remove non-existant trackers from active list.
  }
}
