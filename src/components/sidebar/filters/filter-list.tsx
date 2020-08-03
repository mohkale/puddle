import React from 'react';

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
