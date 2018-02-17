import React from 'react'

import { Button } from '../components/Button.js'
import Page from '../components/Page'
import withAuth from '../hocs/withAuth'
import { preferences, setPreferences } from '../drivers/preferences'

const PreferencesPage = ({ auth, ...props }) => (
  <Page
    title="Preferences"
    loadingText=""
    errorText=""
    pageExplainText="Make Always In Mind work the way you like."
    {...props}
  >
    {helpFn => (
      <Button
        className="button-router"
        label="Slow slides"
        helpFn={helpFn}
        helpText="Saves it"
        actionFn={() => {
          setPreferences({
            slideshowRate: 5000,
          })
        }}
      />
    )}
  </Page>
)

export default withAuth(PreferencesPage)
