import React from 'react';

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
 * possible entries that a user can select.
 */
export default function FilterList(props: FilterListProps) {
  if (React.Children.count(props.children) === 0) {
    return null
  }

  return (
    <ul className="filters">
      <li className="title">{ props.title }</li>
      {props.children}
    </ul>
  )
}
