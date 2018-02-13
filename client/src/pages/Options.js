import React from 'react'

import { HomeButton } from '../components/Button.js'
import Page from '../components/Page'

const Options = props => (
  <Page
    title="Options"
    loadingText=""
    errorText=""
    pageExplainText="Change the way AlwaysInMind works."
    {...props}
  >
    {helpFn => [
      <HomeButton
        className="button-goback"
        label="Save Settings"
        helpFn={helpFn}
      />,
    ]}
  </Page>
)

export default Options
