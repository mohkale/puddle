import React from 'react';

export interface ColumnResizeContext {
  column: number,
  startPos: number,
  delta: number,
  minPos: number,
}

export default function ResizeComponent(props: { resizeCtx: ColumnResizeContext, finish: (w: number) => void}) {
  const [leftOffset, setLeftOffset] = React.useState(props.resizeCtx.startPos)

  return (
    <div className="resize-overlay"
    onMouseUp={(e) => {
      props.finish(leftOffset - props.resizeCtx.startPos)
    }}
    onMouseMove={(e) => {
      setLeftOffset(Math.max(props.resizeCtx.minPos, e.clientX - props.resizeCtx.delta))
    }} >
      <div className="resize-indicator" style={{left: leftOffset}}></div>
    </div>
  )
}


