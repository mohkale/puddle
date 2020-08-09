/**
 * The kinds of notifications that puddle can share with the
 * user.
 */
export enum NotificationTypes {
  TORRENT_ADDED,
  TORRENT_REMOVED,
}

// NOTE: each notification should have an associated property type.
// there's no way to associate these with the enum, and we can't
// store classes in redux stores so we'll have to use generics and
// non-DRY principles to enforce type safety :/.

export interface TorrentAddedNotificationProps {
  count: number
}

export interface TorrentRemovedNotificationProps {
  id: number
  name: string
}
