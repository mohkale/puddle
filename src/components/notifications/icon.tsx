import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTriangle } from '@puddle/utils/fontawesome';

import { NotificationLevel } from '@puddle/stores';

/* eslint-disable-next-line react/display-name */
export const NotificationIcon = React.memo((props: { level: NotificationLevel }) => {
  let icon;
  switch (props.level) {
    case NotificationLevel.INFO:
      icon = faCheck
      break
    case NotificationLevel.WARN:
      icon = faTriangle
      break
    case NotificationLevel.ERROR:
      icon = faTimes
      break
  }

  return <FontAwesomeIcon icon={icon} className="icon" />;
})


