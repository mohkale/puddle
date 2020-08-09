import { Notification } from './notifications'

let notificationsCounter = 0;

export function generateNotification<T>(
  props: Omit<Notification<T>, 'id'|'date'>
): Notification<T> {
  return {
    id: notificationsCounter++,
    date: Date.now(),
    ...props
  }
}
