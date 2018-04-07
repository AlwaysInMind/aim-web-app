import React from 'react'

import {
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'

import './SupporterBar.css'

const PreferencesButton = ({ isPreferencesScreen, ...props }) =>
  !isPreferencesScreen ? (
    <RouterButton
      route="/preferences"
      className="supporter-preferences"
      image={`${process.env.PUBLIC_URL}/preferences.svg`}
      helpText="Change user preferences"
      {...props}
    />
  ) : (
    <RouterButton
      route="!goHome"
      className="supporter-preferences"
      label="Back"
      helpText="Return to Always in Mind"
      {...props}
    />
  )

export const SupporterBar = ({ title, helpFn }) => (
  <React.Fragment>
    <div className="sbar-background" />
    <SpeakingButton
      className="sbar-title"
      label="Support"
      helpText="Use these buttons to manage user features."
      helpFn={helpFn}
    />{' '}
    <PreferencesButton
      className="sbar-prefs"
      isPreferencesScreen={title === 'Preferences'}
      helpFn={helpFn}
    />
    <AuthButton
      className="sbar-exit"
      helpText="Stop using Always In Mind"
      helpFn={helpFn}
    />
    <div className="sbar-blank" />
  </React.Fragment>
)
