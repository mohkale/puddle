import React from 'react';

import {
  Notification, NotificationTypes,

  TorrentAddedNotificationProps,
  TorrentRemovedNotificationProps
} from '@puddle/stores';

type NotificationProps<T> =
  { title: string } & T

function Highlight(props) {
  return <span className="highlight">{props.children}</span>
}

function TorrentAddedNotification(
  props: NotificationProps<TorrentAddedNotificationProps>
) {
  return (
    <span>
      Added <Highlight>{props.count}</Highlight> Torrent{props.count === 1 ? '' : 's'}
    </span>
  );
}

function TorrentRemovedNotification(
  props: NotificationProps<TorrentRemovedNotificationProps>
) {
  return (
    <span title={props.name}>
      Removed Torrent <Highlight>{props.name}</Highlight>
    </span>
  );
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function NotificationContent(props: Notification<any>) {
  switch (props.type) {
    case NotificationTypes.TORRENT_ADDED:
      return <TorrentAddedNotification title={props.title} {...props.props} />
    case NotificationTypes.TORRENT_REMOVED:
      return <TorrentRemovedNotification title={props.title} {...props.props} />
  }

  return <span>{props.title}</span>
}
