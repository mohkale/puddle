import React, { Fragment } from 'react';
import { scaleBytes } from '@puddle/utils';

export interface BytesWithUnitProps {
  bytes: number
  perSecond?: boolean
}

export function BytesWithUnit(props: BytesWithUnitProps) {
  const [bytes, rateUnit] = scaleBytes(props.bytes)
  return (
    <Fragment>
      {bytes.toFixed(2)}
      <span className="unit">
        {rateUnit}
        {props.perSecond && '/s'}
      </span>
    </Fragment>
  )
}
