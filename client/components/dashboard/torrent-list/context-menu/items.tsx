import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { copyStringToClipboard } from '@client/utils';
import { TransmissionPriorityType as PriorityType } from '@transmission';

import {
  RootState, showTorrentDetails, setLabelsOverlayAssigned,
  removeTorrentOverlayAssigned, selectTorrentById,
  setTorrentLocationOverlayAssigned, notifyRequestError
} from '@client/stores';

import {
  ClientContext, BandwidthPrioritySlider, isPriorityType,
  ExtendedPriorityType, cyclePriority
} from '@client/components';

export interface ContextItemProps {
  torrents: number[]
}

export function StartTorrentsItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.startTorrent(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err, description: `starting torrents: ${props.torrents}`
      }))
    }
  }

  return <li onClick={onClick}>Start</li>;
}

export function StopTorrentsItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.stopTorrent(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err, description: `stopping torrents: ${props.torrents}`
      }))
    }
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
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.verifyTorrent(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err, description: `recheck torrents: ${props.torrents}`
      }))
    }
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
  const dispatch = useDispatch()
  const [priority, setPriority] = useState(PriorityType.NORM)
  const updatePriority = async (p: ExtendedPriorityType) => {
    if (isPriorityType(p)) {
      try {
        await transmission.setTorrent(props.torrents, { bandwidthPriority: p })
        setPriority(p)
      } catch (err) {
        await dispatch(notifyRequestError({
          to: 'transmission', errorMessage: err, description: `setting torrent priority: ${props.torrents}`
        }))
      }
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
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.moveTorrentsToTop(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err,
        description: `moving torrents to top of queue: ${props.torrents}`
      }))
    }
  }

  return <li onClick={onClick}>Move to Top</li>;
}

export function MoveToBottomItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.moveTorrentsToBottom(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err,
        description: `moving torrents to bottom of queue: ${props.torrents}`
      }))
    }
  }

  return <li onClick={onClick}>Move to Bottom</li>;
}

export function MoveUpItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      await transmission.moveTorrentsUp(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err,
        description: `moving torrents up in queue: ${props.torrents}`
      }))
    }
  }

  return <li onClick={onClick}>Move Up</li>;
}

export function MoveDownItem(props: ContextItemProps) {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const onClick = async () => {
    try {
      transmission.moveTorrentsDown(props.torrents)
    } catch (err) {
      await dispatch(notifyRequestError({
        to: 'transmission', errorMessage: err,
        description: `moving torrents down queue: ${props.torrents}`
      }))
    }
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
