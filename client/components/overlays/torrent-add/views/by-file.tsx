import '@cstyles/overlays/torrent-add';
import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { overlayRemoved } from '@client/stores'
import {
  ClientContext, LabelSelector, SelectOption,
  MessageType, DragDropRegion
} from '@client/components';

import { onSubmitGeneral } from '../on-submit';
import { Row, Form } from '../../settings/controls';
import { sessionSelector, useStateFromSelector } from '../../settings/utils';

interface FileEntry {
  filename: string
  metainfo: string
}

interface FileListProps {
  entry: FileEntry
  remove: VoidFunction
}

function FileListItem(props: FileListProps) {
  return (
    <li key={props.entry.metainfo}>
      <FontAwesomeIcon icon={faFile} className="icon" />
      <span className="torrent-add__file-list__file-name">{props.entry.filename}</span>
      <FontAwesomeIcon icon={faTimes} className="icon torrent-add__file-list__exit-icon" onClick={props.remove} />
    </li>
  )
}

export function ByFile() {
  const dispatch = useDispatch()
  const { transmission } = useContext(ClientContext)
  const [messages, setMessages] = useState<MessageType[]>([])

  const [files, setFiles] = useState<FileEntry[]>([])
  const [labels, setLabels] = useState<SelectOption<string>[]>([])
  const [destination, setDestination] = useStateFromSelector(sessionSelector(s => s['download-dir']))

  const onSubmit = () =>
    onSubmitGeneral(
      transmission,
      files,
      labels.map(l => l.value),
      destination,
      setFiles,
      setMessages,
      file => ({ metainfo: file.metainfo }),
      (file, i, error) => file === undefined ? error : `File ${i} ${error}`)

  const onSuccess = () => { dispatch(overlayRemoved()) }

  const fileEntries = (files.length > 0 &&
    <ul className="torrent-add__file-list">
      {files.map((file, i) =>
         <FileListItem
           key={file.metainfo} entry={file}
           remove={() => setFiles([...files.slice(0, i), ...files.slice(i+1)])} />)}
    </ul>)

  return (
    <Form onSubmit={onSubmit} onSuccess={onSuccess} messages={messages}>
      <Row>
        <label>Torrents</label>
        <div className="torrent-add__file-input-container">
          {fileEntries}
          <DragDropRegion
            setMessages={setMessages}
            setFiles={(newFiles) => {
              setFiles([
                ...files,
                ...newFiles.map(({ file, url }) =>
                  ({filename: file.name, metainfo: url.split(',')[1] }))
              ])
            }} />
        </div>
      </Row>

      <Row>
        <label>Destination</label>
        <input type="text" className="textbox"
          value={destination} onChange={e => setDestination(e.target.value)} />
      </Row>

      <Row>
        <label>Tags</label>
        <LabelSelector
          onChange={setLabels}
          selectedLabels={labels} />
      </Row>
    </Form>
  )
}
