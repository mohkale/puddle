import React from 'react';
import OverlayContainer from './container';

interface ModalProps {
  title: string
  className?: string
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  return (
    <OverlayContainer>
      <div className={`modal ${props.className}`}>
        <header><h1>{props.title}</h1></header>

        <div className="modal--modal-body">
          {props.children}
        </div>
      </div>
    </OverlayContainer>
  )
}
