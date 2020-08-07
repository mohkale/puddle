import './index.scss';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps<T> extends React.HTMLProps<HTMLButtonElement> {
  run: () => (Promise<T>|T)
  onSuccess?: (T) => void
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onFailure?: (err: any) => void
}

/**
 * Root component for a button that manages some asynchronous
 * (or concurrent) behaviour. When clicked, the {@code run} method
 * is invoked and if the result is a promise, then the button
 * switches to showing a loading icon and is no longer clickable
 * until the promise is resolved or rejected.
 */
export default function LoaderButton<T = void>(_props: ButtonProps<T>) {
  const [promise, setPromise] = useState<Promise<T|void|undefined>>()
  const { run, className, disabled, onSuccess, onFailure, ...props } = _props;

  const onClick = () => {
    if (promise !== undefined || disabled)
      return

    const res = run();
    if (res instanceof Promise) {
      setPromise(
        (res as Promise<T>)
          .finally(() => setPromise(undefined))
          .then(res => {
            onSuccess && onSuccess!(res)
            return res
          })
          .catch(err => onFailure && onFailure!(err)))
    }
  }

  const classes = [className, className, 'loader', promise === undefined ? '' : 'loading']

  return (
    <button className={classes.join(' ')} {...props}
            onClick={onClick} disabled={disabled} type="button" >
      <div className="text">{props.children}</div>

      <div className="loading-icon">
        <FontAwesomeIcon icon={faCircleNotch} className="icon" />
      </div>
    </button>
  );
}
