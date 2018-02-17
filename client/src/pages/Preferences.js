import React from 'react'

import { OnOffButton } from '../components/Button.js'
import { Page } from '../components/Page'
import { withAuth } from '../hocs/withAuth'
import { preferences, setPreferences } from '../drivers/preferences'

class PreferencesPage extends React.Component {
  PrefsButton = ({ label, pref, ...props }) => {
    return (
      <OnOffButton
        label={label}
        isOn={preferences[pref]}
        actionFn={on => {
          setPreferences({
            [pref]: on,
          })
          this.forceUpdate()
        }}
        {...props}
      />
    )
  }

  render() {
    const { auth, ...props } = this.props
    return (
      <Page
        title="Preferences"
        loadingText=""
        errorText=""
        pageExplainText="Make Always In Mind work the way you like."
        {...props}
      >
        {helpFn => [
          <this.PrefsButton
            label="Speak Help"
            helpFn={helpFn}
            helpText="Turn help speech on and off"
            pref="speakHelp"
            key="speakHelp"
          />,
          <this.PrefsButton
            label="Show Help"
            helpFn={helpFn}
            helpText="Turn help display on and off"
            pref="showHelp"
            key="showHelp"
          />,
        ]}
      </Page>
    )
  }
}

export const wrappedPage = withAuth(PreferencesPage)
export { wrappedPage as PreferencesPage }
