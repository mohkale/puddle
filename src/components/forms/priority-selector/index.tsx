import './index.scss';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ClientContext } from '@puddle/components';
import {
  TransmissionTorrentStatus as TorrentStatus,
  TransmissionPriorityType as PriorityType
} from '@puddle/transmission';

/**
 * Builds on the known priority types to also include not downloading
 * as a priority type. This is used for files which you can choose not
 * to download.
 */
export type ExtendedPriorityType = PriorityType | 'dont-download'

/**
 * class names for each priority type in the known types. Theses
 * are used to influence the styling of the element.
 */
const PRIORITY_CLASSES: { [key in ExtendedPriorityType]: string } = {
  [PriorityType.LOW]:  'low',
  [PriorityType.NORM]: 'norm',
  [PriorityType.HIGH]: 'high',
  'dont-download': 'dont-download'
}

/**
 * The labels shown alongside each priority level when allowed.
 */
const PRIORITY_LABELS: { [key in ExtendedPriorityType]: string } = {
  [PriorityType.LOW]:  'Low',
  [PriorityType.NORM]: 'Normal',
  [PriorityType.HIGH]: 'High',
  'dont-download': "Don't Download",
}

/**
 * Assert whether {@code p} is an extended priority type, or a regular
 * one.
 */
export function isPriorityType(p: ExtendedPriorityType): p is PriorityType {
  return p !== 'dont-download'
}

/**
 * Cycle a priority type to the next priority type.
 */
function cyclePriority(
  priority: ExtendedPriorityType,
  canNotDownload: boolean
): ExtendedPriorityType {
  switch (priority) {
    case PriorityType.HIGH:
      if (canNotDownload) {
        return 'dont-download'
      } else {
        return PriorityType.LOW
      }
    case PriorityType.LOW:
      return PriorityType.NORM
    case PriorityType.NORM:
      return PriorityType.HIGH
    case 'dont-download':
      return PriorityType.LOW
    default:
      return PriorityType.NORM
  }
}

interface BandwidthPrioritySliderTypes {
  priority: ExtendedPriorityType
  attachLabel?: boolean
  canNotDownload?: boolean
  setPriority: (p: ExtendedPriorityType) => any
}

export function BandwidthPrioritySlider(props: BandwidthPrioritySliderTypes) {
  const indicatorClassName = `indicator ${PRIORITY_CLASSES[props.priority]}`

  const onClick = (e: React.MouseEvent) =>
    props.setPriority(cyclePriority(props.priority, props.canNotDownload!))

  return (
    <div className="torrent-priority" onClick={onClick}>
      <span className={indicatorClassName}></span>
      {props.attachLabel &&
        <span className="label">{PRIORITY_LABELS[props.priority]}</span>}
    </div>
  );
}
