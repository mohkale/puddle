/**
 * The kinds of notifications that puddle can share with the
 * user.
 */
export enum NotificationTypes {
  TORRENT_ADDED,
  TORRENT_REMOVED,
  REQUEST_ERROR,
}

import { Torrent } from '@client/models';

export const PERSISTENT_NOTIFICATION_TYPES = new Set([
  NotificationTypes.TORRENT_ADDED,
  NotificationTypes.TORRENT_REMOVED,
])

// NOTE: each notification should have an associated property type.
// there's no way to associate these with the enum, and we can't
// store classes in redux stores so we'll have to use generics and
// non-DRY principles to enforce type safety :/.

export interface TorrentAddedNotificationProps {
  torrents: Torrent[]
}

export interface TorrentRemovedNotificationProps {
  torrent: Torrent
}

export interface RequestErrorNotificationProps {
  /**
   * Where was the request going?
   */
  to: 'puddle' | 'transmission'

  /**
   * What were you trying to do when the error happened.
   */
  description: string

  /**
   * Any messages associated with the error.
   */
  errorMessage?: string
}
