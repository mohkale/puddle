import React from 'react';
import './styles';

import TorrentColumns, {
  TorrentColumn, MINIMUM_WIDTH as MINIMUM_COLUMN_WIDTH
} from '@puddle/components/columns';

import TorrentResponse, {
  TransmissionTorrentStatus as TorrentStatus
} from '@puddle/transmission/responses/torrent';
import { TorrentId } from '@puddle/transmission';

import Header from '@puddle/components/header';
import TorrentsListHeader from '@puddle/components/torrents/header';
import TorrentList from '@puddle/components/torrents/list';
import ColumnResizer, { ColumnResizeContext }
  from '@puddle/components/torrents/column-resize';

import { Scrollbars } from 'react-custom-scrollbars';

interface DashboardProps {
  columns: TorrentColumns
  torrents: Partial<TorrentResponse>[],
  resizeColumn: (i: number, delta: number) => void,
}

interface DashboardState {
  activeColumn: number,
  descending: boolean,
  resizing?: ColumnResizeContext,
  selectedTorrents: TorrentId[]
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props) {
    super(props)
    this.state = {
      activeColumn: 0,
      descending: false,
      selectedTorrents: [],
    }

    this.torrentsRef = React.createRef()
  }

  torrentsRef: React.RefObject<HTMLDivElement>

  render() {
    return (
      <main id="dashboard">
        <Header />
        <Scrollbars className="scrollbars">
          <div id="torrents" ref={this.torrentsRef}>
            <TorrentsListHeader columns={this.props.columns.activeColumns}
                              activeIndex={this.state.activeColumn}
                              descending={this.state.descending}
                              setColumn={(i) => this.setState({activeColumn: i})}
                              setOrder={(order) => this.setState({descending: order})}
                              startResizing={this.startResizingColumn} />
            {this.state.resizing &&
              <ColumnResizer resizeCtx={this.state.resizing!}
                             finish={(delta) => {
                               this.setState({resizing: undefined});
                               this.props.resizeColumn(this.state.resizing!.column, delta)
                             }} />}
            <TorrentList torrents={this.props.torrents} selectedTorrents={this.state.selectedTorrents} selectTorrent={this.selectTorrent} columns={this.props.columns} />
          </div>
        </Scrollbars>
      </main>
    )
  }

  startResizingColumn = (column: number, xOffset: number) => {
    const container = this.torrentsRef.current
    if (container as HTMLElement) {
      const bounds = container!.getBoundingClientRect()

      const minPos = this.props.columns
        .activeColumns
        .slice(0, column)
        .reduce((acc, col) => acc + col.width, 0)

      this.setState({
        resizing: {
          column: column,
          delta: bounds.left,
          startPos: xOffset - bounds.left,
          minPos: minPos + MINIMUM_COLUMN_WIDTH,
        }
      })
    }
  }

  selectTorrent = (index: number, append: boolean=false) => {
    this.setState({
      selectedTorrents: [...(append ? this.state.selectedTorrents : []), this.props.torrents[index].id!]
    })
  }
}
