import './index.scss';
import React from 'react';

/**
 * Component to associate a number of torrents with a
 * given filter. If the number isn't provided than a ?
 * is shown to indicate it's still being determined.
 */
export default function Badge(props: { num?: number }) {
  return (
    <span className="badge" key="badge">
      {props.num != null ? props.num.toString() : '?'}
    </span>
  );
}
