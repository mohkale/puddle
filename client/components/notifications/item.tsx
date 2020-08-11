import React from 'react';
import { Notification } from '@client/stores';

import { NotificationIcon } from './icon';
import { NotificationContent } from './renderers';

export interface NotificationItemProps<T>
  extends React.HTMLProps<HTMLElement> {
    notification: Notification<T>
    contentChildren?: React.ReactNode
  }

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function NotificationItem<T>({ notification, onClick, contentChildren, children }: NotificationItemProps<T>) {
  return (
    <li className={`notification ${onClick && 'notification--clickable'} notification--${notification.kind}`}>
      <div className="notification__with-icon" onClick={onClick}>
        <NotificationIcon level={notification.kind} />

        <span className="notification__content">
          <span className="notification__body">
          {/* we wrap the actual content into this span so
              props.contentChildren doesn't get cut off alongside
              this when the notification width is too small. */}
            <NotificationContent {...notification} />
          </span>

          {contentChildren}
        </span>
      </div>

      {children}
    </li>
  );
}
