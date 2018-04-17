import React from 'react'

import { Button, SpeakingButton } from '../components/Button.js'

import './Header.css'

const ExplainButton = ({ explainFn, ...props }) => {
  return (
    <Button
      className="header-help"
      label="Help"
      actionFn={explainFn}
      {...props}
    />
  )
}

export const Header = ({ title, helpFn, handleScreenHelp }) => (
  <React.Fragment>
    <ExplainButton
      explainFn={handleScreenHelp}
      helpText="Explains how to use this screen"
      helpFn={helpFn}
    />
    <SpeakingButton
      className="header-title"
      label={title}
      helpText={title}
      helpFn={helpFn}
    />
  </React.Fragment>
)
