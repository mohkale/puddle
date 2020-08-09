import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Notification, notificationRemoved } from '@client/stores';

import { NotificationIcon } from './icon';
import { NotificationContent } from './renderers';

const REMOVE_NOTIFICATION_TIMEOUT = 5000;

export function NotificationItem<T>(props: Notification<T>) {
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
      dispatch(notificationRemoved(props.id))
    }, REMOVE_NOTIFICATION_TIMEOUT)
  }, [])

  return (
    <li className={props.kind}>
      <NotificationIcon level={props.kind} />

      <span className="content">
        <NotificationContent {...props} />
      </span>
    </li>
  );
}
