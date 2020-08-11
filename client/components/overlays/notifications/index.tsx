import '@cstyles/overlays/notifications';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import { AsyncButton } from '@client/components';

import {
  selectNotifications,
  fetchNotificationsArchive,
  selectNotificationsArchiveHasMore
} from '@client/stores';

import Modal from '../modal';
import { NotificationOverlayItem } from './item';

export default function NotificationsOverlay() {
  const dispatch = useDispatch()
  const notifications = useSelector(selectNotifications)
  const moreExists = useSelector(selectNotificationsArchiveHasMore)

  const loadMore = () => dispatch(fetchNotificationsArchive)

  return (
    <Modal title={`Notifications (${notifications.length})`} className="notifications-modal">
      <Scrollbar>
        <ul className="notifications-list">
          {notifications.map(n =>
            <NotificationOverlayItem key={n.id} notification={n} />)}
        </ul>

        <AsyncButton className="btn btn--submit" disabled={!moreExists}
                     run={loadMore} style={{ width: '100%' }}>
          {moreExists ? 'Load More'
                      : notifications.length > 0
                      ? 'No More Notifications to Load'
                      : 'No notifications yet'}
        </AsyncButton>
      </Scrollbar>
    </Modal>
  )
}
