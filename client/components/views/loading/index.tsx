import '@cstyles/views/loading';
import React from 'react';
import Loading from 'react-loading';

export default function LoadingView() {
  return (
    <div className="loading-container">
      <Loading color='defaultColor' type='spinningBubbles' />
    </div>
  );
}
