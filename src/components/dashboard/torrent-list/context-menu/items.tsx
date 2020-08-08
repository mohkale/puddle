import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { copyStringToClipboard } from '@puddle/utils';
import { TransmissionPriorityType as PriorityType } from '@puddle/transmission';

import {
  RootState, showTorrentDetails, setLabelsOverlayAssigned,
  removeTorrentOverlayAssigned, selectTorrentById,
  setTorrentLocationOverlayAssigned
} from '@puddle/stores';

import {
  ClientContext, BandwidthPrioritySlider, isPriorityType,
  ExtendedPriorityType, cyclePriority
} from '@puddle/components';

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
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(removeTorrentOverlayAssigned(props.torrents))
  }

  return <li onClick={onClick}>Remove</li>;
}

export function CheckHashesItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    transmission.verifyTorrent(props.torrents)
  }

  return <li onClick={onClick}>Check Hash</li>;
}

export function SetLabelsItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(setLabelsOverlayAssigned(props.torrents))
  }

  return <li onClick={onClick}>Set Tags</li>;
}

export function SetTorrentLocationItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(setTorrentLocationOverlayAssigned(props.torrents))
  }

  return <li onClick={onClick}>Set Location</li>;
}

export function DetailsItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = () => {
    dispatch(showTorrentDetails(transmission, props.torrents[0]))
  }

  return <li onClick={onClick}>Details</li>;
}

export function PriorityItem(props: ContextItemProps) {
  const { transmission } = useContext(ClientContext)
  // TODO if all torrents share same priority, use that as default
  // instead of NORM.
  const [priority, setPriority] = useState(PriorityType.NORM)
  const updatePriority = (p: ExtendedPriorityType) => {
    if (isPriorityType(p)) {
      transmission.setTorrent(props.torrents, { bandwidthPriority: p })
        .then(() => setPriority(p))
    }
  }
  const onRootClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // clicking parent should be the same as clicking the slider.
    updatePriority(cyclePriority(priority, false))
  }

  return (
    <li onClick={onRootClick}
        style={{display: 'flex', justifyContent: 'space-between'}}>
      Priority
      <BandwidthPrioritySlider priority={priority} setPriority={updatePriority} />
    </li>
  );
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

export function CopyMagnetLinkItem(props: ContextItemProps) {
  const links = useSelector((s: RootState) =>
    props.torrents.map(id => selectTorrentById(id)(s).magnetLink))

  const onClick = () => {
    copyStringToClipboard(links.join('\n'))
  }

  return <li onClick={onClick}>Copy Magnet Link</li>;
}
