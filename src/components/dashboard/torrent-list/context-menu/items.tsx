import React, { useContext } from 'react';
import { ClientContext } from '@puddle/components';

export interface ContextItemProps {
  torrents: number[]
}

export function StartTorrentsItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.startTorrent(props.torrents)
    // TODO notify on error.
  }

  return <li onClick={onClick}>Start</li>;
}

export function StopTorrentsItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.stopTorrent(props.torrents)
  }

  return <li onClick={onClick}>Stop</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function RemoveTorrentsItem(props: ContextItemProps) {
  // TODO remove not yet implemented
  return <li>Remove</li>;
}

export function CheckHashesItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.verifyTorrent(props.torrents)
  }

  return <li onClick={onClick}>Check Hash</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function SetTagsItem(props: ContextItemProps) {
  return <li>Set Tags</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function SetTorrentLocationItem(props: ContextItemProps) {
  return <li>Set Torrent Location</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function DetailsItem(props: ContextItemProps) {
  return <li>Details</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function PriorityItem(props: ContextItemProps) {
  return <li>Priority</li>;
}
