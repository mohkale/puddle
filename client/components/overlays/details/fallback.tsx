import React from 'react';

const styles = {
  width:           '100%',
  height:          '100%',
  display:         'flex',
  // flexWrap:       'wrap',
  justifyContent: 'center',
  alignItems:     'center',
}

/**
 * Root component for displaying some sort of a fallback message
 * when the information associated with a torrents view is missing.
 */
/* eslint-disable react/display-name */
const FallbackMessage =
  React.memo((props) => {
    return (
      <div className="fallback-message" style={styles}>
        <p>{props.children}</p>
      </div>
    );
  })

export default FallbackMessage;
