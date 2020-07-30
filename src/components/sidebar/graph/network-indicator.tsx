import React from 'react';
import { NetworkStats, RootState } from '@puddle/stores';
import { useSelector } from 'react-redux';
import { scaleBytes } from '@puddle/utils';

import { faInfinity } from '@puddle/utils/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

/* eslint-disable react/display-name */

interface NetworkIndicatorStatsProps
          extends React.HTMLProps<HTMLElement> {
  bytes: number
  perSecond?: boolean
}

/**
 * Represents a single displayable metric for transmissions
 * network communications.
 *
 * This couldb be the transfer rate, download limit, total
 * downloaded bytes, etc. A negative value implies there is
 * no limit (or the value is so high its overflowed), in which
 * case an infinity symbol is shown.
 */
const NetworkIndicatorStats =
  React.memo(({ bytes, perSecond, ...props }: NetworkIndicatorStatsProps) => {
    if (bytes < 0) {
      const { className, ...remProps } = props;
      return (
        <span className={[className, "unlimited"].join(' ')} {...remProps}>
          <FontAwesomeIcon icon={faInfinity} className="icon" />
        </span>
      )
    }

    const [rate, rateUnit] = scaleBytes(bytes)
    return (
      <span {...props}>
        {rate.toFixed()}

        <span className="unit">
          {rateUnit}
          {perSecond && '/s'}
        </span>
      </span>
    )
  })

const NetworkIndicator =
  React.memo((props: { kind: string, icon: IconDefinition } & NetworkStats) => {
    const altEnabled = useSelector((state: RootState) => state.stats.altEnabled)

    return (
      <div className={props.kind}>
        <FontAwesomeIcon icon={props.icon} className="direction-icon" />

        <div className="stats">
          <NetworkIndicatorStats className="rate" bytes={props.rate} perSecond={true} />
          <NetworkIndicatorStats className="total" bytes={props.total} />
          <NetworkIndicatorStats className="limit" bytes={altEnabled ? props.altLimit : props.limit} />
        </div>
      </div>
    )
  })

export default NetworkIndicator;
