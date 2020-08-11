import React from 'react';

export type NotificationProps<T> =
  { title: string } & T

export function Highlight(props) {
  return <span className="highlight">{props.children}</span>
}
