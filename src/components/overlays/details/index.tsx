import React, { useEffect, useState, useContext } from 'react';
import { SettingsOverlay } from '@puddle/stores'
import OverlayContainer from '../container';

export default function Details(props: SettingsOverlay) {
  return (
    <OverlayContainer>
      <div className={`modal settings`}>
        <header>
          <h1>Details</h1>
        </header>
      </div>
    </OverlayContainer>
  )
}
