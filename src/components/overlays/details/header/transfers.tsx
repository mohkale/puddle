import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BytesWithUnit } from '@puddle/components';

export function TransferMeasure(props: {
  rate: number, total: number, icon: IconDefinition
} & React.HTMLProps<HTMLLIElement>) {
  return (
    <li className={[props.rate !== 0 ? 'active' : '', props.className].join(' ')}>
      <FontAwesomeIcon icon={props.icon} className="icon" />
      <BytesWithUnit bytes={props.rate} perSecond={true} />
      {' — '}
      <BytesWithUnit bytes={props.total} />
    </li>
  )
}
