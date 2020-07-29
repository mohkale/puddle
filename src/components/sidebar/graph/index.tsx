import './styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppContext from '@puddle/components/app-context';

import { TransmissionSession as Session } from '@puddle/transmission';
import { TransmissionSessionStats as SessionStats } from '@puddle/transmission';
import {
  TransmissionSessionFineGrainedStats as FineGrainedStats
} from '@puddle/transmission/responses/session-stats';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faLongArrowAltDown, faLongArrowAltUp
} from '@fortawesome/free-solid-svg-icons';

import { faInfinity } from '@puddle/utils/fontawesome';

import { RootState, selectNetworkDownloadStats, selectNetworkUploadStats } from '@puddle/stores';
import { NetworkStats } from '@puddle/stores';

import {
  scaleBytes
} from '@puddle/utils';

import NetworkIndicator from './network-indicator';

function DownloadNetworkIndicator(props) {
  const stats = useSelector(selectNetworkDownloadStats)
  return <NetworkIndicator icon={faLongArrowAltDown} {...stats} kind="download" />
}

function UploadNetworkIndicator(props) {
  const stats = useSelector(selectNetworkUploadStats)
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
