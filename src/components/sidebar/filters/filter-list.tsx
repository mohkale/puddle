import React from 'react';

/**
 * Component to associate a number of torrents with a
 * given filter. If the number isn't provided than a ?
 * is shown to indicate it's still being determined.
 */
export function FilterListBadge(props: { num?: number }) {
  return (
    <span className="badge" key="badge">
      {props.num != null ? props.num.toString() : '?'}
    </span>
  );
}

interface FilterListProps {
  title: string
  children: React.ReactNode
}

/**
 * A higher order component for displaying a list of
 * possible filters that a user can select.
 */
export default function FilterList(props: FilterListProps) {
  if (React.Children.count(props.children) === 0) {
    return null
  }

  return (
    <ul className="filter-list">
      <li className="title">{ props.title }</li>
      {props.children}
    </ul>
  )
}
