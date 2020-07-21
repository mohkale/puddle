import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles';

export interface FilterItemType {
  /* The displayed title for the filter item. */
  title: string,

  /* The number of torrents associated with this torrent type. */
  count?: number,

  /* An optional icon to be displayed alongside this entry. */
  icon?: IconDefinition,

  /* whether this filter is currently active or not. */
  active?: boolean
}

interface FilterPropsType {
  title: string,
  items: FilterItemType[]
}

function numToBadge(i?: number) {
  return (
    <span className="badge" key="badge">
      {i != null ? i.toString() : '?'}
    </span>
  );
}

export default class SideBarFilterList extends React.Component<FilterPropsType> {
  render() {
    if (this.props.items.length === 0) {
      return null;
    }

    const items = this.filterEntries;
    if (this.props.title) {
      items.unshift(this.titleElem)
    }

    return <ul className="filters">{items}</ul>;
  }

  private get titleElem() {
    return <li key="title">{this.props.title}</li>;
  }

  /**
   * Each filter entry converted to a list item.
   */
  private get filterEntries() {
    return this.props.items.map(el => {
      const children: any[] = [el.title, numToBadge(el.count)]
      let icon = el.icon;
      if (icon) {
        children.unshift(<FontAwesomeIcon key="icon" icon={icon as IconDefinition} className="icon" />)
      }
      return <li key={'id-' + el.title} className="filter">{children}</li>
    })
  }
}
