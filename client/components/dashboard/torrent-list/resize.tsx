import React, { useState } from 'react';

import { TorrentFields } from '@client/models';

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
export default function ColumnResizer(props: ColumnResizerProps) {
  const [leftOffset, setLeftOffset] = useState(props.ctx.startPos)

  return (
    <div className="resize-overlay"
         onMouseUp={() => {
           props.finish(props.ctx.field, leftOffset - props.ctx.startPos)
         }}
         onMouseMove={(e) => {
           setLeftOffset(Math.max(props.ctx.minPos, e.clientX - props.ctx.delta))
         }} >
      <div className="resize-indicator" style={{ left: leftOffset }}></div>
    </div>
  )
}
