import React from 'react';
import Header from './header';
import EntryTable from './entry-table';

import './styles/index';

export default class Dashboard extends React.Component {
  render() {
    return (
      <main id="dashboard">
        <Header />
        <EntryTable />
      </main>
    )
  }
}
