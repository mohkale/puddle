import '@cstyles/sidebar/graph';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  faLongArrowAltDown, faLongArrowAltUp
} from '@fortawesome/free-solid-svg-icons';

import {
  selectNetworkDownloadStats, selectNetworkUploadStats
} from '@puddle/stores';

import NetworkIndicator from './network-indicator';

function DownloadNetworkIndicator() {
  const stats = useSelector(selectNetworkDownloadStats)
  return <NetworkIndicator icon={faLongArrowAltDown} {...stats} kind="download" />
}

function UploadNetworkIndicator() {
  const stats = useSelector(selectNetworkUploadStats)
  return <NetworkIndicator icon={faLongArrowAltUp} {...stats} kind="upload" />
}

export default function NetworkGraph() {
  return (
    <div className="network-indicators">
      <DownloadNetworkIndicator />
      <UploadNetworkIndicator />
    </div>
  )
}
