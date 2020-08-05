import './index.scss';
import React from 'react';
import ReactSelect, { Props } from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';

export function SelectCreatable(props: Omit<Props, 'className'>) {
  return (
    <ReactSelectCreatable
      className="selector creatable"
      {...props} />
  )
}

export function Select(props: Omit<Props, 'className'>) {
  return (
    <ReactSelect
      className="selector"
      {...props} />
  )
}
