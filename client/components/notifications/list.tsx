import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectActiveNotifications, notificationRemoved } from '@client/stores';

import { NotificationItem, NotificationItemProps } from './item';

const MAX_CONCURRENT_NOTIFICATIONS_COUNT = 10
const REMOVE_NOTIFICATION_TIMEOUT = 5000;

function VolatileNotificationItem<T>(props: NotificationItemProps<T>) {
  const dispatch = useDispatch()

  // once a notification is rendered on the dashboard, wait
  // REMOVE_NOTIFICATION_TIMEOUT and then remove it from the
  // active notifications array.
  //
  // We're hiding notifications based on their render history
  // because this is the easiest way to guarantee backlogged
  // notifications don't get erased before you have a chance
  // to inspect them.
  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationRemoved(props.notification.id))
    }, REMOVE_NOTIFICATION_TIMEOUT)
  }, [])

  return <NotificationItem {...props} />
}

export function NotificationList() {
  const notifications = useSelector(selectActiveNotifications)
  const items = notifications
    .slice(0, MAX_CONCURRENT_NOTIFICATIONS_COUNT)
    .map(o => <VolatileNotificationItem notification={o} key={o.id} />)

  return (
    <ul className="notifications-frontend">
      {items}
    </ul>
  );
}
