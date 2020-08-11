import { Notification } from './notifications';

export interface NotificationsState {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  active: Notification<any>[]
  inactive: Notification<any>[]
  archiveHasMore: boolean
}
