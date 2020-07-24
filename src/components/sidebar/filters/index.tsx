import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterList from '@puddle/components/filter/filter-list';

import './styles';

function Badge(props: { num?: number }) {
  return (
    <span className="badge" key="badge">
      {props.num != null ? props.num.toString() : '?'}
    </span>
  );
}

interface SideBarFilterListProps<T> {
  filter: FilterList<T>
  updateFilter(list: FilterList<T>, index: T): void
}

export default function SideBarFilterList(props: SideBarFilterListProps<any>) {
  const filterEntries = props.filter.filters
  if (filterEntries.length === 0) {
    return null;
  }

  return (
    <ul className="filters">
      <li key="title">{props.filter.title}</li>
      {filterEntries.map((el, i) => {
        return (
          <li key={'id-' + el.title}
              className={["filter", (el.active ? 'active' : '')].join(' ')}
              onClick={() => props.updateFilter(props.filter, el.id)}>
            {el.icon &&
              <FontAwesomeIcon key="icon" icon={el.icon as IconDefinition} className="icon" />}
            {el.title}
            <Badge num={el.count}/>
          </li>
        )
      })}
    </ul>
  );
}
