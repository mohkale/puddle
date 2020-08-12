import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ESSENTIAL_FIELDS } from '@client/models';
import { MessageType, MessageLevel, Scrollbar } from '@client/components';
import {
  selectIntervals, selectColumnSettings, SettingsState,
  COLUMN_MINIMUM_WIDTH, ColumnType, updateSettings
} from '@client/stores'

import { Form, Section, Row } from '../../controls';

import { IntervalsSection } from './intervals';
import { DashboardColumn, COLUMN_TYPES } from './columns';

type ValidateSettingsProps = SettingsState['intervals'] & { columnWidths: { [key in ColumnType]: number } }

/** Assert whether form data is all valid. */
const validateForm =
  ({torrentsSync, speedSync, speedLimitsSync, columnWidths}: ValidateSettingsProps) => {
     let failed = false;
     const newMessages: MessageType[] = [];

     // check intervals are all valid number values
     [{ value: torrentsSync, key: 'torrents-sync' },
      { value: speedSync, key: 'stats-sync' },
      { value: speedLimitsSync, key: 'session-sync' }]
       .forEach(({ value, key }) => {
         if (isNaN(value) || value < 0) {
           failed = true
           newMessages.push({level: MessageLevel.ERROR, label: `${key} must be a valid number greater than 0`})
         }
       })

     Object.entries(columnWidths)
       .forEach(([_, width]) => {
         if (!failed && (isNaN(width))) {
           failed = true
           newMessages.push({level: MessageLevel.ERROR, label: `every column must have a numerical width`})
         }
       })

     return [newMessages, !failed] as [MessageType[], boolean];
  }

function generateColumnWidths(entries: SettingsState['columns']['entries']) {
  return Object.fromEntries(
    Object.entries(entries)
      .map(([type, value]) => [type, value.width])) as { [key in ColumnType]: number }
}

function findLastVisibleColumn(columns: ColumnType[], visibleColumns: ColumnType[]): number {
  const visibleColumnsSet = new Set(visibleColumns)
  const lastVisibleColumn = columns
    .map((column, i) => [column, i] as [ColumnType, number])
    .reverse()
    .find(o => visibleColumnsSet.has(o[0]))

  if (lastVisibleColumn) {
    return lastVisibleColumn[1]
  }

  return -1
}

export function PuddleView() {
  const dispatch = useDispatch()
  const columnSettings = useSelector(selectColumnSettings)

  const [messages, setMessages] = useState<MessageType[]>([])

  const [intervals, setIntervals] = useState(useSelector(selectIntervals))
  const [visibleColumns, setVisibleColumns] = useState(columnSettings.order)
  const [columnOrders, setColumnOrders] = useState(() => {
    const invisibleColumns = COLUMN_TYPES
      .filter(type => !visibleColumns.includes(type))
    return [...columnSettings.order, ...invisibleColumns]
  })
  const [columnWidths, setColumnWidths] = useState(() => generateColumnWidths(columnSettings.entries))

  const setColumnVisibility = (orderPosition: number, field: ColumnType, visibility: boolean) => {
    const position = visibleColumns.indexOf(field)
    if (visibility && position === -1) {
      setVisibleColumns([...visibleColumns, field])

      // move current column up to right after the last visible column position
      const lastVisibleColumn = findLastVisibleColumn(columnOrders, visibleColumns)
      if (lastVisibleColumn+1 !== orderPosition) {
        setColumnOrders([
          ...columnOrders.slice(0, lastVisibleColumn+1), field,
          ...columnOrders.slice(lastVisibleColumn+1, orderPosition),
          ...columnOrders.slice(orderPosition+1)])
      }
    } else if (!visibility && position !== -1) {
      // remove from visible list and then move this column to the end of the column list.
      setVisibleColumns([...visibleColumns.slice(0, position), ...visibleColumns.slice(position+1)])
      setColumnOrders([...columnOrders.slice(0, orderPosition), ...columnOrders.slice(orderPosition+1), field])
    }
  }

  const columnWidth = (field: ColumnType) => columnWidths[field]
  const setColumnWidth = (field: ColumnType, value: number) =>
    setColumnWidths({...columnWidths, [field]: Math.max(value, COLUMN_MINIMUM_WIDTH)})

  const moveColumnUp = (position: number) => {
    const column = columnOrders[position]
    if (position > 0) {
      const newColumnOrders = [...columnOrders]
      newColumnOrders[position] = columnOrders[position-1]
      newColumnOrders[position-1] = column
      setColumnOrders(newColumnOrders)
    }
  }

  const moveColumnDown = (position: number) => {
    const column = columnOrders[position]
    if (position !== columnOrders.length-1) {
      const newColumnOrders = [...columnOrders]
      newColumnOrders[position] = columnOrders[position+1]
      newColumnOrders[position+1] = column
      setColumnOrders(newColumnOrders)
    }
  }

  const columnLabel = (field: ColumnType) =>
    columnSettings.entries[field].tooltip || columnSettings.entries[field].title

  const onSubmit = () => {
    const [newMessages, valid] = validateForm({...intervals, columnWidths})
    setMessages(newMessages)
    if (!valid) return

    dispatch(updateSettings({
      intervals,
      columnWidths: columnWidths,
      columnOrder: columnOrders
        .filter(column => visibleColumns.includes(column))
    }, true))

    setMessages([{ level: MessageLevel.INFO, label: 'succesfully saved changes' }])
  }

  return (
    <Form onSubmit={onSubmit} messages={messages}>
      <IntervalsSection intervals={intervals} setIntervals={setIntervals} />

      <Section title="Columns">
        <Row>
          <Scrollbar style={{height: 200}}>
            <ul className="settings__dashboard-columns">
              {columnOrders.map((column, i) =>
                <DashboardColumn
                  key={column} column={column} label={columnLabel(column)}
                  visible={visibleColumns.includes(column)} setVisibility={setColumnVisibility.bind(null, i, column)}
                  columnWidth={columnWidth(column)} setColumnWidth={setColumnWidth.bind(null, column)}
                  moveUp={moveColumnUp.bind(null, i)} moveDown={moveColumnDown.bind(null, i)} />
                )}
            </ul>
          </Scrollbar>
        </Row>
      </Section>
    </Form>
  )
}
