import React from 'react'
import {
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'

import './Page.css'
import './Button.css'

const OptionsButton = ({ optionsPage }) =>
  !optionsPage ? (
    <RouterButton
      class="header-options"
      route="/options"
      className="header-options"
      image={`${process.env.PUBLIC_URL}/options.svg`}
    />
  ) : (
    <RouterButton
      class="header-options"
      route="/"
      className="header-options"
      label="AIM"
    />
  )

const Page = ({ error, isLoaded, title, loadingText, errorText, children }) => (
  <div className="container">
    <OptionsButton optionsPage={title === 'Options'} />
    <SpeakingButton className="header-main" label={title} />
    <AuthButton className="header-log" />
    {isLoaded !== undefined && error ? (
      <div className="page-error">
        {errorText}
        {console.log(error.message)}
      </div>
    ) : isLoaded !== undefined && !isLoaded ? (
      <div className="page-loading">{loadingText}</div>
    ) : (
      children()
    )}
  </div>
)

export default Page
