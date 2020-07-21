import React from 'react';
import './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends React.Component {
  render() {
    // <FontAwesomeIcon icon={faTimes} className="icon cancel" />
    // TODO include faTimes when query isn't empty.
    return (
      <div id="searchbar">
        <FontAwesomeIcon icon={faSearch} className="icon search" />
        <input name="query" type="text" placeholder="Search Torrents" autoComplete="false" />
      </div>
    )
  }
}
