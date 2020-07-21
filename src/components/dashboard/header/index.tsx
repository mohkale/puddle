import React from 'react';
import TooltipButton from '../../tooltip';

import {
  faPlus, faMinus, faPlay, faStop
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import './styles';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <TooltipButton tooltip="Start Torrent" icon={faPlay} />
        <TooltipButton tooltip="Stop Torrent" icon={faStop} />
        <span className="vl" />
        <TooltipButton tooltip="Add Torrent" icon={faPlus} />
        <TooltipButton tooltip="Remove Torrent" icon={faMinus} />
      </header>
    );
  }
}
