import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export interface FileInputProps extends React.HTMLProps<HTMLInputElement> {
  value: string
  setValue: (string) => void
}

export function FileInput({ value, setValue, style, ...props }: FileInputProps) {
  const fileInputRef = React.useRef<HTMLInputElement>()
  const startFilePicker = () =>
    (fileInputRef.current && fileInputRef.current.click())

  const onClick = (e: React.MouseEvent) => startFilePicker()
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') startFilePicker()
  }

  return (
    <div style={style} className="file-input">
      <input {...props}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)} />

      <div className="file-input--picker">
        {/* @ts-ignore */}
        <input ref={fileInputRef} style={{display: 'none'}} type="file" onChange={(e) => console.log(e)} />
        <FontAwesomeIcon tabIndex={0} onClick={onClick} onKeyPress={onKeyPress} icon={faExternalLinkAlt} className="icon" />
      </div>
    </div>
  );
}

