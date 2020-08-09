import './index.scss';
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTriangle } from '@client/utils/fontawesome';

export enum MessageLevel {
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warning'
}

const MESSAGE_LEVEL_ICON: { [key in MessageLevel]: IconDefinition } = {
  [MessageLevel.ERROR]: faTimes,
  [MessageLevel.INFO]: faCheck,
  [MessageLevel.WARN]: faTriangle,
}

export interface MessageType {
  level: MessageLevel
  label: string
}

export function MessageList(props: { messages: MessageType[] }) {
  return (
    <ul className="messages">
      {props.messages.map(message => {
        const icon = MESSAGE_LEVEL_ICON[message.level];
        return (
          <li className={`messages__message messages__message--${message.level}`} key={message.label}>
            <FontAwesomeIcon className="icon" icon={icon} />
            {message.label}
          </li>
        );
      })}
    </ul>
  )
}
