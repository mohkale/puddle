import React from 'react';
import Header from './header';
import EntryTable from './table';

import './styles/index';

import TorrentColumns, {
  TorrentColumn, DEFAULT_WIDTH as DEFAULT_COLUMN_WIDTH
} from '@puddle/puddle/torrent-columns';

import TorrentResponse from '@puddle/transmission/responses/torrent';

interface DashboardProps {
  columns: TorrentColumns
  torrents: Partial<TorrentResponse>[]
}

function ColumnsTable(props: {
  columns: TorrentColumn[], children?: React.ReactNode,
  activeIndex: number, descending: boolean
}) {
  const activeClass = "active " + (props.descending ? "descending" : "ascending")

  return (
    <table id="torrents">
      <colgroup>
        {props.columns.map(col =>
          <col span={1} key={col.key} style={{width: col.width ?? DEFAULT_COLUMN_WIDTH}} />)}
      </colgroup>

      <thead>
        <tr>
          {props.columns.map((col, i) => (
            <th key={col.key} className={i === props.activeIndex ? activeClass : ""}
            title={col.title}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
      {props.children}
      </tbody>
    </table>
  )
}

export default class Dashboard extends React.Component<DashboardProps> {
  render() {
    return (
      <main id="dashboard">
        <Header />

        <div id="content">
          <ColumnsTable columns={this.props.columns.activeColumns}
                        activeIndex={0} descending={true} >
            {this.props.torrents.map(torrent => (
              <tr key={torrent.id!}>
                {this.props.columns.activeColumns.map(col => {
                  return <td key={col.key}>{col.action(torrent)}</td>
                })}
              </tr>
            ))}
          </ColumnsTable>
        </div>
      </main>
    )
  }
}
