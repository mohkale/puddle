import React from 'react';
import { useDispatch } from 'react-redux';
import { TooltipButton } from '@puddle/components';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import { statisticsOverlayAssigned } from '@puddle/stores';

export function StatisticsButton() {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(statisticsOverlayAssigned())
  }

  return (
    <TooltipButton icon={faChartLine} tooltip="Statistics" onClick={onClick} />
  );
}
