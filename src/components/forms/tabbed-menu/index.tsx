import './index.scss';
import React, { useState } from 'react';
import { Orientation } from '@puddle/utils/types'

export interface TabbedMenuViewType {
  key: string
  children: () => React.ReactChild
}

export interface TabbedMenuProps {
  active: string
  orientation?: Orientation
  views: { [key: string]: TabbedMenuViewType }
}

export function TabbedMenu(props: TabbedMenuProps) {
  const [activeView, setActiveView] = useState(props.active);
  const className = props.orientation === Orientation.VERTICAL ?
    'vertical' : 'horizontal'

  const tabs = Object.entries(props.views)
    .map(([key, view]) => {
      return (
        <li key={view.key}
            className={key === activeView ? 'selected' : ''}
            onClick={() => setActiveView(key)}>
          {view.key}
        </li>
      )
    })

  return (
    <div className={`tabbed-menu ${className}`}>
      <ul className="tabs">{tabs}</ul>
      <div className="tab">
        {props.views[activeView].children()}
      </div>
    </div>
  );
}
