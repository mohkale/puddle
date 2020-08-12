import React from 'react';

import { NumberInput, Checkbox } from '@client/components';
import { COLUMN_MINIMUM_WIDTH } from '@client/stores'
import { ESSENTIAL_FIELDS, TorrentFields } from '@client/models';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const COLUMN_TYPES = Object.values(TorrentFields)
  .filter(x => typeof x === "number") as TorrentFields[]

interface DashboardColumnProps {
  column: TorrentFields
  label: string
  visible: boolean
  setVisibility: (vis: boolean) => void
  columnWidth: number
  setColumnWidth: (width: number) => void
  moveUp: VoidFunction
  moveDown: VoidFunction
}

export function DashboardColumn(props: DashboardColumnProps) {
  const isEssential = ESSENTIAL_FIELDS.includes(props.column)
  const onKeyMoveDown = (e: React.KeyboardEvent) => e.key === 'Enter' && props.moveDown()
  const onKeyMoveUp   = (e: React.KeyboardEvent) => e.key === 'Enter' && props.moveUp()

  return (
    <li>
      <Checkbox disabled={isEssential} isChecked={props.visible} onCheck={props.setVisibility} />
      <FontAwesomeIcon onKeyPress={onKeyMoveDown} onClick={props.moveDown} tabIndex={0} className="settings__dashboard-columns__button" icon={faArrowDown} />
      <FontAwesomeIcon onKeyPress={onKeyMoveUp} onClick={props.moveUp} tabIndex={0} className="settings__dashboard-columns__button" icon={faArrowUp} />
      <span>{props.label}</span>
      <NumberInput title="column-width" value={props.columnWidth} setValue={props.setColumnWidth} />
    </li>
  )
}
