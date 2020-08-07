import React from 'react';
import { ClientContext, AsyncButton } from '@puddle/components';

export interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section(props: SectionProps) {
  return (
    <div className="section">
      <h2>{props.title}</h2>

      {props.children}
    </div>
  )
}
