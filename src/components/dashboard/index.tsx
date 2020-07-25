import React from 'react';

import './styles';
import Header from './header';
import DashboardTable from './table';

export default function Dashboard() {
  return (
    <main id="dashboard">
      <Header />
      <DashboardTable />
    </main>
  )
}
