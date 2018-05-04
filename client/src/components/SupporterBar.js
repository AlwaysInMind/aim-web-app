import React from 'react'

import {
  ExplainButton,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'

import './SupporterBar.css'

const PreferencesButton = ({ isPreferencesScreen, ...props }) =>
  !isPreferencesScreen ? (
    <RouterButton
      route="/preferences"
      label="Options"
      className="supporter-preferences"
      /*      image={`${process.env.PUBLIC_URL}/preferences.svg`}*/
      helpText="Change user preferences"
      {...props}
    />
  ) : (
    <RouterButton
      route="!goHome"
      className="supporter-preferences"
      label="Save Options"
      helpText="Return to Always in Mind"
      {...props}
    />
  )

export const SupporterBar = ({ title, helpFn, handleBarHelp }) => (
  <React.Fragment>
    <div className="sbar-background" />
    <SpeakingButton
      className="button-logo sbar-button"
      image="/AiM_Logo.png"
      helpText="Always in Mind. Designed for people living with dementia and low digital literacy. Share pictures, messages and more with family a friends"
      helpFn={helpFn}
    />
    <ExplainButton
      className="button-explain sbar-button"
      explainFn={handleBarHelp}
      label="Support Help"
      helpText="Support Bar help button. Press to find out more about the Support Bar."
      helpFn={helpFn}
    />
    <PreferencesButton
      className="button-prefs sbar-button"
      isPreferencesScreen={title === 'Change User Options'} // FIXME remove dep on title name
      helpFn={helpFn}
    />
    <AuthButton
      className="button-exit sbar-button"
      helpText="Stop using Always In Mind"
      helpFn={helpFn}
    />
    <div className="sbar-blank" />
  </React.Fragment>
)
