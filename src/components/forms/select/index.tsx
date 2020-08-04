import './index.scss';
import React from 'react';
import ReactSelect, { Props } from 'react-select';

export function Select(props: Omit<Props, 'className'>) {
  return (
    <ReactSelect
      className="selector"
      {...props} />
  )
}
