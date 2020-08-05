import '@cstyles/overlays/statistics';
import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';

import { RootState } from '@puddle/stores';
import OverlayContainer from '../container';
import { BytesWithUnit } from '@puddle/components';

export default function Statistics() {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <OverlayContainer>
      <div className={`modal statistics`}>
        <header>
          <h1>Statistics</h1>
        </header>

        <table className="current-session">
          <thead>
            <tr>
              <td colSpan={2}>Current Session</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Uploaded</td>
              <td><BytesWithUnit bytes={stats.upload.total} /></td>
            </tr>
            <tr>
              <td>Downloaded</td>
              <td><BytesWithUnit bytes={stats.download.total} /></td>
            </tr>
            <tr>
              <td>Ratio</td>
              <td>{(stats.upload.total / stats.download.total).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Running Time</td>
              <td>{moment().add(stats.totalSecondsActiveThisSession * 1000).fromNow(true)}</td>
            </tr>
          </tbody>
        </table>
        <table className="cumulative">
          <thead>
            <tr>
              <td colSpan={2}>Total</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Started</td>
              <td>{stats.sessionCount} Times</td>
            </tr>
            <tr>
              <td>Uploaded</td>
              <td><BytesWithUnit bytes={stats.upload.cumulativeTotal} /></td>
            </tr>
            <tr>
              <td>Downloaded</td>
              <td><BytesWithUnit bytes={stats.download.cumulativeTotal} /></td>
            </tr>
            <tr>
              <td>Ratio</td>
              <td>{(stats.upload.cumulativeTotal / stats.download.cumulativeTotal).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Running Time</td>
              <td>{moment().add(stats.totalSecondsActive * 1000).fromNow(true)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </OverlayContainer>
  )
}
