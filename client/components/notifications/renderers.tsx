import React from 'react';

import {
  Notification, NotificationTypes,

  TorrentAddedNotificationProps,
  TorrentRemovedNotificationProps
} from '@client/stores';

import { NotificationProps, Highlight } from './shared';

function TorrentAddedNotification(props: NotificationProps<TorrentAddedNotificationProps>) {
  const count = props.torrents.length
  return (
    <span>
      Added <Highlight>{count}</Highlight> Torrent{count === 1 ? '' : 's'}
    </span>
  );
}

function TorrentRemovedNotification(props: NotificationProps<TorrentRemovedNotificationProps>) {
  return (
    <span title={props.torrent.name}>
      Removed Torrent <Highlight>{props.torrent.name}</Highlight>
    </span>
  );
}

// const DefaultNotification = (props: NotificationProps<any>) => <span>{props.title}</span>;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const NOTIFICATION_CONTENT_RENDERERS: { [key in NotificationTypes]: (props: NotificationProps<any>) => JSX.Element } = {
  [NotificationTypes.TORRENT_ADDED]: TorrentAddedNotification,
  [NotificationTypes.TORRENT_REMOVED]: TorrentRemovedNotification,
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function NotificationContent(props: Notification<any>) {
  const Renderer = NOTIFICATION_CONTENT_RENDERERS[props.type];
  return <Renderer {...props.props} />
}
