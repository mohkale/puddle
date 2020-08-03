import './index.scss';
import React, { useState } from 'react';

// export enum TabbedMenuOrientation {
//   HORIZONTAL,
//   VERTICAL
// }

export interface TabbedMenuViewType {
  key: string
  children: () => React.ReactChild
}

export interface TabbedMenuProps {
  active: string
  views: { [key: string]: TabbedMenuViewType }
}

export function TabbedMenu(props: TabbedMenuProps) {
  const [activeView, setActiveView] = useState(props.active);
  const className = "horizontal"

  const tabs = Object.entries(props.views)
    .map(([key, view]) => {
      return (
        <li key={view.key}
            className={key == activeView ? 'selected' : ''}
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
