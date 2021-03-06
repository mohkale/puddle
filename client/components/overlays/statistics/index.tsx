import '@cstyles/overlays/statistics';
import React from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';

import { RootState } from '@client/stores';
import { BytesWithUnit } from '@client/components';
import { safeDivide } from '@client/utils';

import Modal from '../modal';

export default function Statistics() {
  const stats = useSelector((state: RootState) => state.stats)

  return (
    <Modal title="Statistics" className="statistics">
      <table className="statistics-table__session">
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
            <td>{safeDivide(stats.upload.total, stats.download.total).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Running Time</td>
            <td>{moment().add(stats.totalSecondsActiveThisSession * 1000).fromNow(true)}</td>
          </tr>
        </tbody>
      </table>

      <table className="statistics-table__session">
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
            <td>{safeDivide(stats.upload.cumulativeTotal, stats.download.cumulativeTotal).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Running Time</td>
            <td>{moment().add(stats.totalSecondsActive * 1000).fromNow(true)}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  )
}
