import './styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppContext from '@puddle/components/app-context';

import Session from '@puddle/transmission/responses/session';
import SessionStats from '@puddle/transmission/responses/session-stats';
import {
  TransmissionSessionFineGrainedStatsType as FineGrainedStats
} from '@puddle/transmission/responses/session-stats';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faLongArrowAltDown, faLongArrowAltUp
} from '@fortawesome/free-solid-svg-icons';

import { faInfinity } from '@puddle/utils/fontawesome';

import { RootState } from '@puddle/stores';
import { NetworkStats } from '@puddle/stores/stats-store';

import {
  scaleBytes
} from '@puddle/utils';

const UPDATE_SPEED_INTERVAL = 2000;
const UPDATE_LIMIT_INTERVAL = 60000;

interface NetworkGraphFields {
  rate:  number
  total: number
  limit: number
}

interface NetworkGraphStateType {
  download: NetworkGraphFields
  upload: NetworkGraphFields
}

interface NetworkIndicatorStatsProps extends React.HTMLProps<HTMLElement> {
  bytes: number
  perSecond?: boolean
}

const NetworkIndicatorStats =
  React.memo(({ bytes, perSecond, ...props }: NetworkIndicatorStatsProps) => {
    if (bytes < 0) {
      let { className, ...remProps } = props;
      return (
        <span className={[className, "unlimited"].join(' ')} {...remProps}>
          <FontAwesomeIcon icon={faInfinity} className="icon" />
        </span>
      )
    }

    const [rate, rateUnit] = scaleBytes(bytes)
    return (
      <span {...props}>
        {rate.toFixed()}

        <span className="unit">
          {rateUnit}
          {perSecond && '/s'}
        </span>
      </span>
    )
  })

const NetworkIndicator =
  React.memo((props: { kind: string, icon: IconDefinition } & NetworkStats) => {
    const altEnabled = useSelector((state: RootState) => state.stats.altEnabled)

    return (
      <div className={props.kind}>
        <FontAwesomeIcon icon={props.icon} className="direction-icon" />

        <div className="stats">
          <NetworkIndicatorStats className="rate" bytes={props.rate} perSecond={true} />
          <NetworkIndicatorStats className="total" bytes={props.total} />
          <NetworkIndicatorStats className="limit" bytes={altEnabled ? props.altLimit : props.limit} />
        </div>
      </div>
    )
  })

function DownloadNetworkIndicator(props) {
  const stats = useSelector((state: RootState) => state.stats.download)
  return <NetworkIndicator icon={faLongArrowAltDown} {...stats} kind="download" />
}

function UploadNetworkIndicator(props) {
  const stats = useSelector((state: RootState) => state.stats.upload)
  return <NetworkIndicator icon={faLongArrowAltUp} {...stats} kind="upload" />
}

export default function NetworkGraph(props) {
  return (
    <div className="network-indicators">
      <DownloadNetworkIndicator />
      <UploadNetworkIndicator />
    </div>
  )
}
