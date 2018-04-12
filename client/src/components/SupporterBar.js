import React from 'react'

import {
  Button,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'

import './SupporterBar.css'

const PreferencesButton = ({ isPreferencesScreen, ...props }) =>
  !isPreferencesScreen ? (
    <RouterButton
      route="/preferences"
      label="Preferences"
      className="supporter-preferences"
      image={`${process.env.PUBLIC_URL}/preferences.svg`}
      helpText="Change user preferences"
      {...props}
    />
  ) : (
    <RouterButton
      route="!goHome"
      className="supporter-preferences"
      label="Save Preferences"
      helpText="Return to Always in Mind"
      {...props}
    />
  )

const ExplainButton = ({ explainFn, ...props }) => {
  return (
    <Button
      className="sbar-help sbar-button"
      label="Explain"
      actionFn={explainFn}
      {...props}
    />
  )
}

export const SupporterBar = ({ title, helpFn, handleBarHelp }) => (
  <React.Fragment>
    <div className="sbar-background" />
    <SpeakingButton
      className="sbar-title sbar-button"
      label="Supporter"
      helpText="Use these buttons to manage user features."
      helpFn={helpFn}
    />
    <ExplainButton
      explainFn={handleBarHelp}
      helpText="Use these buttons to manage user features."
      helpFn={helpFn}
    />
    <PreferencesButton
      className="sbar-prefs sbar-button"
      isPreferencesScreen={title === 'Preferences'}
      helpFn={helpFn}
    />
    <AuthButton
      className="sbar-exit sbar-button"
      helpText="Stop using Always In Mind"
      helpFn={helpFn}
    />
    <div className="sbar-blank" />
  </React.Fragment>
)
