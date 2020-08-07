import './index.scss'
import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CheckboxProps {
  fallback?: () => React.ReactChild
  isChecked: boolean
  onCheck: (v: boolean) => void
  label?: string
}

export function Checkbox(props: CheckboxProps) {
  const classes = ['checkbox', props.isChecked ? 'checked' : '',
                   props.fallback && 'with-fallback'].join(' ')

  const onClick = () => props.onCheck(!props.isChecked)
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onClick()
  }

  return (
    <div className="checkbox-container" onClick={onClick}>
      <div className={`${classes}`} tabIndex={0}
          onKeyPress={onKeyPress}>
        <FontAwesomeIcon icon={faCheck} className="check icon" />
        {props.fallback &&
          props.fallback()}
      </div>
      {props.label &&
        <label>{props.label}</label>}
    </div>
  )
}
