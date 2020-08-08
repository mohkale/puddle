import '@cstyles/overlays/torrent-add';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export interface URLInputProps {
  urls: string[]
  setUrls: (s: string[]) => void
}

/**
 * Form component to show a list of input fields, with the
 * ability to add or remove new fields.
 */
export function URLInput(props: URLInputProps) {
  const removeUrl = (i: number) => {
    props.setUrls([...props.urls.slice(0, i),
                   ...props.urls.slice(i+1)])
  }

  const addNewUrl = () => { props.setUrls([...props.urls, '']) }
  const setUrlValue = (i: number, e) => {
    props.setUrls([...props.urls.slice(0, i),
                   e.target.value,
                   ...props.urls.slice(i+1)])
  }

  const entries = props.urls
    .map((url, i) => (
      <div key={i} className="torrent-add__url-input">
        <input type="text" className="textbox"
          value={url} onChange={(e) => setUrlValue(i, e)}
          placeholder="Torrent URL or Magnet Link" />

        <div className="url-input__button-list">
          {i > 0 &&
            <FontAwesomeIcon icon={faMinus} className="icon" onClick={() => removeUrl(i)} />}
          <FontAwesomeIcon icon={faPlus} className="icon" onClick={addNewUrl} />
        </div>
      </div>
    ))

  return <div className="torrent-add__url-input-container">{entries}</div>;
}

