import React from 'react'
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

import { overlayRemoved } from '@puddle/stores';
import { AsyncButton } from '@puddle/components';

export enum MessageLevel {
  ERROR = 'error',
  INFO = 'info',
}

const MESSAGE_LEVEL_ICON: { [key in MessageLevel]: IconDefinition } = {
  [MessageLevel.ERROR]: faTimes,
  [MessageLevel.INFO]: faCheck,
}

export interface MessageType {
  level: MessageLevel
  label: string
}

export interface FormProps {
  children: React.ReactNode
  messages: MessageType[]
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onSubmit: () => (Promise<any>|any)
}

export function Form(props: FormProps) {
  const dispatch = useDispatch()
  const removeOverlay = () => dispatch(overlayRemoved())

  return (
    <div className="settings-form">
      {props.messages &&
        <ul className="messages">
          {props.messages.map(message => {
            const icon = MESSAGE_LEVEL_ICON[message.level];
            return (
              <li className={message.level} key={message.label}>
                <FontAwesomeIcon className="icon" icon={icon} />
                {message.label}
              </li>
            );
          })}
        </ul>}

      {props.children}

      <div className="submission-controls">
        <button onClick={removeOverlay} className="btn">Cancel</button>

        <AsyncButton run={props.onSubmit} className="btn btn--submit">
          Submit
        </AsyncButton>
      </div>
    </div>
  )
}
