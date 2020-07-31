export * from './levels';
export * from './types';

import { NotificationLevel } from './levels';
import { NotificationTypes } from './types';

export interface Notification<T> {
  id:    number
  title: string
  kind:  NotificationLevel
  type:  NotificationTypes
  date:  number
  props: T
}
