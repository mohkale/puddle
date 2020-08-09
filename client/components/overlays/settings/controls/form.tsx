import React from 'react'
import { useDispatch } from 'react-redux';

import { overlayRemoved } from '@client/stores';
import { AsyncButton, MessageType, MessageList } from '@client/components';

export interface FormProps {
  children: React.ReactNode
  messages: MessageType[]
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onSubmit: () => (Promise<any>|any)
  onSuccess?: VoidFunction
  submitDisabled?: boolean
}

export function Form(props: FormProps) {
  const dispatch = useDispatch()
  const removeOverlay = () => dispatch(overlayRemoved())

  return (
    <div className="modal__form">
      {props.messages.length > 0 &&
        <MessageList messages={props.messages} />}

      {props.children}

      <div className="submission-controls">
        <button onClick={removeOverlay} className="btn">Cancel</button>

        <AsyncButton run={props.onSubmit} onSuccess={props.onSuccess} className="btn btn--submit"
                     disabled={props.submitDisabled} >
          Submit
        </AsyncButton>
      </div>
    </div>
  )
}
