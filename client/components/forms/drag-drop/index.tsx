import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';

import { readFileURLAsync } from '@client/utils';
import { MessageType, MessageLevel } from '@client/components';

export interface DragAndDroppedFile {
  file: File
  url: string
}

export interface DragDropRegionProps {
  setFiles: (files: DragAndDroppedFile[]) => void
  setMessages: (msg: MessageType[]) => void
}

export function DragDropRegion(props: DragDropRegionProps) {
  const onDrop = useCallback(files => {
    const messages: MessageType[] = []
    const loadedFiles: DragAndDroppedFile[] = []

    Promise.all(files.map(async (file) => {
      try {
        loadedFiles.push({ file, url: await readFileURLAsync(file) })
      } catch (err) {
        messages.push({ level: MessageLevel.ERROR, label: `failed to load file ${file.name}` })
      }
    })).finally(() => {
      props.setMessages(messages)
      props.setFiles(loadedFiles)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="drag-drop-region" {...getRootProps()}>
      <FontAwesomeIcon icon={faFile} className="drag-drop-region__icon" />
      <input {...getInputProps()} />
      <p>Drop some files here{isDragActive ? '' : <span>, <span className="highlight">or click to browse</span></span>}</p>
    </div>
  )
}

