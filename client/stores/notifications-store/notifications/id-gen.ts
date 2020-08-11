import { stringHash } from '@client/utils';
import { NotificationTypes } from './types';

/**
 * Generate a psuedo unique identifier for a new notification.
 *
 * Psuedo unique because there's no guarantee it will be unique,
 * but the chance of it being a duplicate should be extremely
 * low.
 *
 */
export function notificationIdGen(
  type: NotificationTypes, date: number, title: string
) {
  return `${date}_${type}_${stringHash(title)}`
}
