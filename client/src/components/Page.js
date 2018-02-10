import React from 'react'
import { SpeakingButton, AuthButton } from '../components/Button.js'

const Page = ({ error, isLoaded, title, loadingText, errorText, children }) => (
  <React.Fragment>
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
  </React.Fragment>
)

export default Page
