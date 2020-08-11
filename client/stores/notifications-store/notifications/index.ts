export * from './levels';
export * from './types';
export * from './id-gen';

import { NotificationLevel } from './levels';
import { NotificationTypes } from './types';

export interface Notification<T> {
  id:    string
  title: string
  kind:  NotificationLevel
  type:  NotificationTypes
  date:  number
  props: T
}
