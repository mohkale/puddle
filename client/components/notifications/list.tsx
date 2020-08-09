import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationItem } from './item';
import { selectNotifications } from '@client/stores';

const MAX_CONCURRENT_NOTIFICATIONS_COUNT = 10

export function NotificationList() {
  const notifications = useSelector(selectNotifications)
  const items = notifications
    .slice(0, MAX_CONCURRENT_NOTIFICATIONS_COUNT)
    .map(o => <NotificationItem key={o.id} {...o} />)

  return (
    <ul className="notifications">
      {items}
    </ul>
  );
}
