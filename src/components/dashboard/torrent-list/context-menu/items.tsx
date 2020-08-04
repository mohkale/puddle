import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ClientContext } from '@puddle/components';
import { showTorrentDetails, OverlayType } from '@puddle/stores';

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
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    dispatch(showTorrentDetails(transmission, props.torrents[0]))
  }

  return <li onClick={onClick}>Details</li>;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function PriorityItem(props: ContextItemProps) {
  return <li>Priority</li>;
}

export function MoveToTopItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.moveTorrentsToTop(props.torrents)
  }

  return <li onClick={onClick}>Move to Top</li>;
}

export function MoveToBottomItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.moveTorrentsToBottom(props.torrents)
  }

  return <li onClick={onClick}>Move to Bottom</li>;
}

export function MoveUpItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.moveTorrentsUp(props.torrents)
  }

  return <li onClick={onClick}>Move Up</li>;
}

export function MoveDownItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.moveTorrentsDown(props.torrents)
  }

  return <li onClick={onClick}>Move Down</li>;
}
