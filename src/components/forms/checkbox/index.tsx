import './index.scss'
import React from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@puddle/utils/fontawesome';

interface CheckboxProps {
  fallback?: () => React.ReactChild
  isChecked: boolean
  onCheck: (v: boolean) => void
}

export function Checkbox(props: CheckboxProps) {
  const classes = ['checkbox', props.isChecked ? 'checked' : '',
                   props.fallback && 'with-fallback'].join(' ')

  const onClick = () => props.onCheck(!props.isChecked)
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onClick()
  }

  return (
    <div className={`${classes}`} tabIndex={0}
         onClick={onClick} onKeyPress={onKeyPress}>
      <FontAwesomeIcon icon={faCheck} className="check icon" />
      {props.fallback &&
        props.fallback()}
    </div>
  )
}
