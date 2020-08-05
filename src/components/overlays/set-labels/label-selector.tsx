import React from 'react';
import { useSelector } from 'react-redux';

import { SelectCreatable } from '@puddle/components';
import { selectTorrentLabels } from '@puddle/stores'

interface LabelSelectorProps {
  selectedLabels: number[]
  onChange: (options: string[]) => void
}

export function LabelSelector(props: LabelSelectorProps) {
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
