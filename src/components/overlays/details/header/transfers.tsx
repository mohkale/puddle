import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { scaleBytes } from '@puddle/utils';

export function TransferMeasure(props: {
  rate: number, total: number, icon: IconDefinition
} & React.HTMLProps<HTMLLIElement>) {
  const [rate, rateUnit] = scaleBytes(props.rate)
  const [total, totalUnit] = scaleBytes(props.total)

  return (
    <li className={[rate !== 0 ? 'active' : '', props.className].join(' ')}>
      <FontAwesomeIcon icon={props.icon} className="icon" />
      {rate.toFixed(2)}<span className="unit">{rateUnit}/s</span>
      {' — '}
      {total.toFixed(2)}<span className="unit">{totalUnit}</span>
    </li>
  )
}
