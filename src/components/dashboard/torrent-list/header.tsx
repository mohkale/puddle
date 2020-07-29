import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectColumns, selectColumnIsDescending,
  TorrentFields, columnResized, activeFieldChanged,
  COLUMN_MINIMUM_WIDTH
} from '@puddle/stores';

/** header of the table of torrents. */
interface DashboardTableColumnsProps {
  parentRef: React.MutableRefObject<HTMLElement | null>;
}

const DashboardTableColumns =
  React.forwardRef<HTMLDivElement, DashboardTableColumnsProps>((props, ref) => {
    const dispatch = useDispatch()
    const columns = useSelector(selectColumns)
    const isDescending = useSelector(selectColumnIsDescending)
    const [resizing, setResizing] = React.useState<ColumnResizeContext|null>(null)

    const columnElems = columns
      .map((column, i) => {
        const className =
          ['table-cell', column.isActive ? 'selected' : '',
           isDescending ? 'descending' : ''].join(' ')

        const onHeaderClick = () =>
          dispatch(activeFieldChanged({ field: column.field }))

        const onResizeStart = (e) => {
          const container = props.parentRef.current
          if (container === null) return
          const bounds = container!.getBoundingClientRect()

          const minPos = columns
            .slice(0, i)
            .map(c => c.width)
            .reduce((acc, width) => acc + width, COLUMN_MINIMUM_WIDTH)

          setResizing({
            field: column.field,
            delta: bounds.left,
            startPos: e.clientX - bounds.left,
            minPos: minPos
          })
        }

        return (
          <div title={column.title} key={column.field} className={className}
               style={{width: column.width}} onClick={onHeaderClick}>
            <span className="label">{column.title}</span>
            <span className="resizer" onMouseDown={onResizeStart}></span>
          </div>
        );
      })

    return (
      <Fragment>
        <aside className="columns" ref={ref}>{columnElems}</aside>
        {resizing &&
          <ColumnResizer ctx={resizing!} finish={(field: TorrentFields, delta: number) => {
            setResizing(null)
            dispatch(columnResized({ field, delta }))
          }} />}
      </Fragment>
    );
  })

export default DashboardTableColumns;

/**
 * metadata associated with a column resize event.
 */
export interface ColumnResizeContext {
  /** the column that is being resized. */
  field: TorrentFields

  /** where the mouse was first pressed */
  startPos: number

  /** offset from the top left corner of the window. */
  delta: number

  /** column cannot be resized below this point on the screen. */
  minPos: number
}

interface ColumnResizerProps {
  ctx: ColumnResizeContext
  finish: (w: TorrentFields, delta: number) => void
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
           props.finish(props.ctx.field, leftOffset - props.ctx.startPos)
         }}
         onMouseMove={(e) => {
           setLeftOffset(Math.max(props.ctx.minPos, e.clientX - props.ctx.delta))
         }} >
      <div className="resize-indicator" style={{ left: leftOffset }}></div>
    </div>
  )
}
