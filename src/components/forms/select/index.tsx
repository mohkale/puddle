import React from 'react';
import ReactSelect, { Props } from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';

export interface SelectOption<T> {
  label: string
  value: T
}

function generateStyles(height: number) {
  return {
    control: (base, state) => ({
      ...base,
      fontSize: '0.875rem',
      height: height,
      minHeight: height,
      minWidth: 220,
      color: 'var(--input-fg)',
      backgroundColor: 'var(--input-bg)',
      borderColor: state.isFocused ? 'var(--input-selected-border)' : 'var(--input-border)',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'var(--action-color)' : 'var(--context-menu-fg)',
      backgroundColor: 'var(--context-menu-bg)',
      fontSize: '0.875rem',

      '&:hover': {
        backgroundColor: 'var(--context-menu-hover-bg)',
      }
    }),
    input: base => ({
      ...base,
      color: 'var(--input-placeholder)',
    }),

    singleValue: base => ({
      ...base,
      color: 'var(--input-fg)',
    }),
    multiValueLabel: base => ({
      ...base,
      color: 'var(--input-selected-border)',
      backgroundColor: 'var(--input-selected-bg)',
      fontSize: '0.85rem',
      padding: '2px 8px',
    }),
    multiValueRemove: base => ({
      ...base,
      color: 'var(--input-selected-border)',
      backgroundColor: 'var(--input-selected-bg)',
      borderLeft: 'solid 1px var(--input-selected-border)',
      borderRadius: 0,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      paddingLeft: 2,
      paddingRight: 2,

      '&:hover': {
        color: 'var(--error-color)',
        borderLeftColor: 'var(--error-color)',
      }
    }),

    indicatorContainer: base => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
    }),
    indicatorSeparator: (base, state) => ({
      ...base,
      margin: 0,
      height: height,
      backgroundColor: state.isFocused ? 'var(--input-selected-border)' : 'var(--input-border)',
      opacity: state.isFocused ? 0.3 : 1,
    }),
    dropdownIndicator: base => ({
      ...base,
      color: 'currentColor',
      height: height,
    }),
    clearIndicator: base => ({
      ...base,
      color: 'currentColor',
      height: height,
    })
  }
}

const SELECT_STYLES = generateStyles(34)
const SELECT_MULTI_STYLES = generateStyles(38)

export function SelectCreatable(props: Omit<Props, 'className'>) {
  const styles = props.isMulti ? SELECT_MULTI_STYLES : SELECT_STYLES

  return (
    <ReactSelectCreatable
      className="selector creatable"
      styles={styles}
      {...props} />
  )
}

export function Select(props: Omit<Props, 'className'>) {
  const styles = props.isMulti ? SELECT_MULTI_STYLES : SELECT_STYLES

  return (
    <ReactSelect
      className="selector"
      styles={styles}
      {...props} />
  )
}
