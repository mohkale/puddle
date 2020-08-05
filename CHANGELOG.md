## [Unreleased]
### TODO
- set torrent location
- set torrent tags
- settings controls (see transmission web view)
- expanded notifications history
- set download limits from sidebar button
- add fields to torrent details:
  - running time
  - remaining time
  - last activity
  - availability
  - total uploaded/downloaded
- use directories in the file tree view to select
  all files within that directory
- offer "expanded" view for torrents (see flood)
- add statistics overlay (see transmission web view)
- arrow keys to move up and down torrents
- shift arrow keys to select torrents (above and below)
- disable context menu entries which only work for one torrent
- draggable columns to reorder
- minimise/clear options for filter lists
- drag and drop torrent layer

### Added
- Changelog and semantic versioning
- Notification system
- Show torrents from transmission
  - Includes percentage complete
- Context menu for bulk processing on multiple torrents
- Basic filtering/ordering support
  - Can filter by one or more tags, keywords, trackers or torrent status
  - Can order by multiple torrent attributes (defaults to queue position)
  - Can reverse the sort order
- Expanded details view showing specific information for a single torrent
  - Bandwidth priority control for individual files in a torrent list
- Options for moving torrents up and down in the queue
