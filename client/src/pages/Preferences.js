import React from 'react'

import { HomeButton } from '../components/Button.js'
import Page from '../components/Page'
import withAuth from '../hocs/withAuth'
import { setPreferences } from '../modules/preferences'

const Preferences = ({ auth, ...props }) => (
  <Page
    title="Preferences"
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
        actionFn={() => {
          setPreferences(auth.accessToken, { wibble: 'bobble' })
        }}
      />,
    ]}
  </Page>
)

export default withAuth(Preferences)
