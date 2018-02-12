import React from 'react'

import { HomeButton } from '../components/Button.js'
import Page from '../components/Page'

const Options = props => (
  <Page
    title="Options"
    loadingText=""
    errorText=""
    pageHelpText="Change the way AlwaysInMind works."
    {...props}
  >
    {() => [<HomeButton className="button-goback" label="Save Settings" />]}
  </Page>
)

export default Options
