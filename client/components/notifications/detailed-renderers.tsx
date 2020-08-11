import React, { Fragment } from 'react';
import moment from 'moment';

import '@cstyles/scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

import {
  Notification, NotificationTypes,

  TorrentAddedNotificationProps,
  TorrentRemovedNotificationProps
} from '@client/stores';

import { Torrent } from '@client/models';
import { NotificationProps } from './shared';

function TorrentDetails({ torrent }: { torrent: Torrent }) {
  return (
    <table key={torrent.id}>
      <tbody>
        <tr>
          <td>id</td>
          <td>{torrent.id}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{torrent.name}</td>
        </tr>
        <tr>
          <td>Hash String</td>
          <td>{torrent.hashString}</td>
        </tr>
        <tr>
          <td>Magnet Link</td>
          <td>{torrent.magnetLink}</td>
        </tr>
      </tbody>
    </table>
  )
}

function TorrentAddedExpandedContent(props: NotificationProps<TorrentAddedNotificationProps>) {
  const entries = props.torrents.map(
    torrent => <TorrentDetails key={torrent.id} torrent={torrent} />)

  return <Fragment>{entries}</Fragment>;
}

function TorrentRemovedExpandedContent(props: NotificationProps<TorrentRemovedNotificationProps>) {
  return (
    <TorrentDetails torrent={props.torrent} />
  )
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const NOTIFICATION_DETAILED_CONTENT_RENDERERS: Partial<{ [key in NotificationTypes]: (props: NotificationProps<any>) => JSX.Element }> = {
  [NotificationTypes.TORRENT_ADDED]: TorrentAddedExpandedContent,
  [NotificationTypes.TORRENT_REMOVED]: TorrentRemovedExpandedContent,
}

export function notificationHasDetails(type: NotificationTypes) {
  return NOTIFICATION_DETAILED_CONTENT_RENDERERS[type] !== undefined
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function NotificationDetailedContent(props: Notification<any>) {
  const Renderer = NOTIFICATION_DETAILED_CONTENT_RENDERERS[props.type];
  if (!Renderer) {
    return null
  }

  const date = moment(props.date).format('YYYY-MM-DD HH:mm:s')

  return (
    <div className="notification__expanded-content">
      <Scrollbar>
        <p className="notification__date">{date}</p>
        <Renderer {...props.props} />
      </Scrollbar>
    </div>
  )
}
