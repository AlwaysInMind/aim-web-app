import React from 'react'

import { ExplainButton, SpeakingButton } from '../components/Button.js'
import { preferences } from '../drivers/preferences'

import './Header.css'

export const Header = ({ title, helpFn, handleScreenHelp }) => (
  <React.Fragment>
    <div className="header-background" />
    {(preferences.complexity !== 0 || title === 'Choose an Activity to do') && ( // FIXME remove dep on title
      <ExplainButton
        className="header-button button-explain"
        explainFn={handleScreenHelp}
        helpText="Explains how to use this screen"
        helpFn={helpFn}
      />
    )}
    <SpeakingButton
      className="header-button button-title"
      label={title}
      helpText={title}
      helpFn={helpFn}
    />
  </React.Fragment>
)
