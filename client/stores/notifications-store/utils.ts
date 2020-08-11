import { notificationIdGen as id, Notification } from './notifications'

export function generateNotification<T>(
  props: Omit<Notification<T>, 'id'|'date'>
): Notification<T> {
  const date = Date.now()
  return {
    id: id(props.type, date, props.title),
    date: date,
    ...props
  }
}
