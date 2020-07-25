import React, { Fragment, useState } from 'react';
import { RootState } from '@puddle/stores';
import {
  ColumnType, ColumnState,
  resized as columnResized,
  selected as columnSelected,
  MINIMUM_WIDTH as MINIMUM_COLUMN_WIDTH
} from '@puddle/stores/columns';
import { useDispatch, useSelector } from 'react-redux';

/** header of the table of torrents. */
export default function DashboardTableColumns(props: { torrentsRef: React.MutableRefObject<HTMLDivElement | null> }) {
  const [resizing, setResizing] = React.useState<ColumnResizeContext|null>(null)
  const dispatch = useDispatch()
  const columnsState: ColumnState = useSelector((state: RootState) => state.columns);

  const columnElems = columnsState.columnOrder
    .map(columnId => {
      const column = columnsState.columns[columnId]
      const isActive = columnsState.activeColumn == columnId
      const className = ['table-cell', isActive ? 'active' : '',
                         columnsState.isDescending ? 'descending' : ''].join(' ')

      const onHeaderClick = () =>
        dispatch(columnSelected({ column: columnId }))

      const onResizeStart = (e) => {
        const container = props.torrentsRef.current
        if (container === null) return
        const bounds = container!.getBoundingClientRect()

        const selectedIndex = columnsState.columnOrder.indexOf(columnId)
        const minPos = columnsState.columnOrder
          .map(columnId => columnsState.columns[columnId])
          .slice(0, selectedIndex)
          .reduce((acc, col) => acc + col.width, MINIMUM_COLUMN_WIDTH)

        setResizing({
          column: columnId,
          delta: bounds.left,
          startPos: e.clientX - bounds.left,
          minPos: minPos
        })
      }

      return (
        <div title={column.title} key={columnId} className={className}
             style={{width: column.width}} onClick={onHeaderClick}>
          <span className="label">{column.title}</span>
          <span className="resizer" onMouseDown={onResizeStart}></span>
        </div>
      );
    })

  return (
    <Fragment>
      <aside className="columns">{columnElems}</aside>
      {resizing &&
        <ColumnResizer ctx={resizing!} finish={(col: ColumnType, delta: number) => {
          setResizing(null)
          dispatch(columnResized({ column: col, delta: delta }))
        }} />}
    </Fragment>
  );
}

/**
 * metadata associated with a column resize event.
 */
export interface ColumnResizeContext {
  /** the column that is being resized. */
  column: ColumnType

  /** where the mouse was first pressed */
  startPos: number

  /** offset from the top left corner of the window. */
  delta: number

  /** column cannot be resized below this point on the screen. */
  minPos: number
}

interface ColumnResizerProps {
  ctx: ColumnResizeContext
  finish: (w: ColumnType, delta: number) => void
}

/**
 * A component to manage the resizing of a column.
 *
 * Displays a guide when resizing to indicate the new column width,
 * and on mouse resize invokes {@code props.finish} with the column
 * that's being resized and how many pixels smaller or larger the
 * the column should now be.
 */
function ColumnResizer(props: ColumnResizerProps) {
  const [leftOffset, setLeftOffset] = React.useState(props.ctx.startPos)

  return (
    <div className="resize-overlay"
         onMouseUp={(e) => {
           props.finish(props.ctx.column, leftOffset - props.ctx.startPos)
         }}
         onMouseMove={(e) => {
           setLeftOffset(Math.max(props.ctx.minPos, e.clientX - props.ctx.delta))
         }} >
      <div className="resize-indicator" style={{ left: leftOffset }}></div>
    </div>
  )
}

