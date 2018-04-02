import React from 'react'

import {
  Button,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'

import './Header.css'

const PreferencesButton = ({ isPreferencesPage, ...props }) =>
  !isPreferencesPage ? (
    <RouterButton
      route="/preferences"
      className="header-preferences"
      image={`${process.env.PUBLIC_URL}/preferences.svg`}
      helpText="Change Preferences"
      {...props}
    />
  ) : (
    <RouterButton
      route="!goHome"
      className="header-preferences"
      label="Back"
      helpText="Return to Always in Mind"
      {...props}
    />
  )

const ExplainButton = ({ explainFn, ...props }) => {
  return (
    <Button
      className="header-help"
      label="Explain"
      actionFn={explainFn}
      {...props}
    />
  )
}

export const Header = ({ title, helpFn, handleScreenHelp }) => (
  <React.Fragment>
    <PreferencesButton
      isPreferencesPage={title === 'Preferences'}
      helpFn={helpFn}
    />
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
    <AuthButton
      className="header-exit"
      helpText="Stop using Always In Mind"
      helpFn={helpFn}
    />
  </React.Fragment>
)
