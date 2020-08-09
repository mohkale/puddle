import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectColumns, selectColumnIsDescending,
  activeFieldChanged, COLUMN_MINIMUM_WIDTH
} from '@client/stores';

import { ColumnResizeContext } from './resize';

/** header of the table of torrents. */
interface DashboardTableColumnsProps {
  startResizing: (o: Pick<ColumnResizeContext, 'field' | 'startPos' | 'minPos'>) => void
}

/* eslint-disable react/display-name */
const DashboardTableColumns =
  React.forwardRef<HTMLDivElement, DashboardTableColumnsProps>((props, ref) => {
    const dispatch = useDispatch()
    const columns = useSelector(selectColumns)
    const isDescending = useSelector(selectColumnIsDescending)

    const columnElems = columns
      .map((column, i) => {
        const className =
          ['cell', column.isActive ? 'selected' : '',
           isDescending ? 'descending' : ''].join(' ')

        const onHeaderClick = (e) => {
          if (e.button !== 0) return

          dispatch(activeFieldChanged({ field: column.field }))
        }

        const onResizeStart = (e: React.MouseEvent) => {
          if (e.button !== 0) return

          const minPos = columns
            .slice(0, i)
            .map(c => c.width)
            .reduce((acc, width) => acc + width, COLUMN_MINIMUM_WIDTH)

          props.startResizing({field: column.field, startPos: e.clientX, minPos: minPos});
        }

        return (
          <div title={column.tooltip || column.title}
               key={column.field} className={className}
               style={{width: column.width}} onClick={onHeaderClick}>
            <span className="label">{column.title}</span>
            <span className="resizer" onMouseDown={onResizeStart}></span>
          </div>
        );
      })

    return (
      <aside className="torrents-list__header" ref={ref}>{columnElems}</aside>
    );
  })

export default DashboardTableColumns;
