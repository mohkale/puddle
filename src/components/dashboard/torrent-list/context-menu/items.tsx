import React, { useContext } from 'react';
import { ClientContext } from '@puddle/components';

export interface ContextItemProps {
  torrents: number[]
}

export function StartTorrentsItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = (e) => {
    transmission.startTorrent(props.torrents)
    // TODO notify on error.
  }

  return <li onClick={onClick}>Start</li>;
}

export function StopTorrentsItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = (e) => {
    transmission.stopTorrent(props.torrents)
  }

  return <li onClick={onClick}>Stop</li>;
}

export function RemoveTorrentsItem(props: ContextItemProps) {
  // TODO remove not yet implemented
  return <li>Remove</li>;
}

export function CheckHashesItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = (e) => {
    transmission.verifyTorrent(props.torrents)
  }

  return <li onClick={onClick}>Check Hash</li>;
}

export function SetTagsItem(props: ContextItemProps) {
  return <li>Set Tags</li>;
}

export function SetTorrentLocationItem(props: ContextItemProps) {
  return <li>Set Torrent Location</li>;
}

export function DetailsItem(props: ContextItemProps) {
  return <li>Details</li>;
}

export function PriorityItem(props: ContextItemProps) {
  return <li>Priority</li>;
}
