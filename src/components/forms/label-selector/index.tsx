import React from 'react';
import { useSelector } from 'react-redux';

import { selectTorrentLabels } from '@puddle/stores'
import { SelectCreatable, SelectOption } from '@puddle/components';

export interface LabelSelectorProps<T> {
  selectedLabels: SelectOption<T>[]
  onChange: (options: SelectOption<T>[]) => void
}

export function LabelSelector<T>(props: LabelSelectorProps<T>) {
  const labels = useSelector(selectTorrentLabels)
  const options = labels.map(label => ({ label, value: label }))

  return (
    <SelectCreatable
      isMulti={true}
      value={props.selectedLabels}
      onChange={props.onChange}
      options={options} />
  )
}
