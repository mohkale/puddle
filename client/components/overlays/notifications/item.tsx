import '@cstyles/overlays/notifications';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { NotificationItem } from '@client/components/notifications/item'
import {
  NotificationDetailedContent, notificationHasDetails
} from '@client/components/notifications/detailed-renderers'
import { Notification, deleteNotification } from '@client/stores';

interface EntryProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  notification: Notification<any>
}

export function NotificationOverlayItem({ notification }: EntryProps) {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)
  const onDelete = e => {
    e.stopPropagation()
    dispatch(deleteNotification(notification.id))
  }
  const expandNotification = () => setExpanded(!expanded);
  const hasDetails = notificationHasDetails(notification.type)

  const buttons = (
    <div className="notification__buttons">
      {hasDetails &&
        <FontAwesomeIcon className="notification__icon notification__expand-icon" onClick={expandNotification} icon={faChevronDown} />}
      <FontAwesomeIcon className="notification__icon notification__delete-icon" onClick={onDelete} icon={faTimes} />
    </div>
  )

  return (
    <NotificationItem notification={notification} contentChildren={buttons} onClick={hasDetails ? expandNotification : undefined} >
      {expanded &&
        <NotificationDetailedContent {...notification} />}
    </NotificationItem>
  );
}

