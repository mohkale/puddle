import React from 'react';

import TorrentColumns, {
  TorrentColumn, DEFAULT_WIDTH as DEFAULT_COLUMN_WIDTH
} from '@puddle/components/columns';
import TorrentResponse, { TransmissionTorrentStatus as TorrentStatus } from '@puddle/transmission/responses/torrent';

import './styles';

interface EntryTableHeaderPropsType {
  columns: TorrentColumn[],
  activeIndex: number,
  descending: boolean,
  setColumn: (i: number) => void,
  setOrder: (o: boolean) => void,
  startResizing: (i: number, j: number) => void,
}

export default class EntryTableHeader extends React.PureComponent<EntryTableHeaderPropsType> {
  render() {
    const activeClass = "active " + (this.props.descending ? "descending" : "ascending")

    return (
      <aside className="columns">
        {this.props.columns.map((col, i) => (
          <div title={col.title} key={col.key}
                className={"table-cell " + (i === this.props.activeIndex ? activeClass : "")}
                style={{width: col.width || DEFAULT_COLUMN_WIDTH}}
                onClick={() => {
                  if (i === this.props.activeIndex) {
                    this.props.setOrder(!this.props.descending)
                  } else {
                    // TODO maybe change order as well?
                    this.props.setColumn(i)
                  }
                }} >
            <span className="label">{col.title}</span>
            <span className="resizer" onMouseDown={(e) => {
              this.props.startResizing(i, e.clientX)
            }}></span>
          </div>
        ))}
      </aside>
    )
  }
}
