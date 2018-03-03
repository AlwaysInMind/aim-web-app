import React from 'react'

import { OnOffButton } from '../components/Button.js'
import { Page } from '../components/Page'
import { withAuth } from '../hocs/withAuth'
import { preferences, setPreferences } from '../drivers/preferences'

const RadioButtonGroup = ({ children }) => children.map(child => child)

const parseValueString = valueString => JSON.parse(`{"v":${valueString}}`).v
class PreferencesPage extends React.Component {
  PrefsButton = ({ label, pref, group, ...props }) => {
    const prefName = pref.includes(':') ? pref.split(':')[0] : pref
    const prefValue = pref.includes(':')
      ? on => {
          // use statment to avoid mysterious eslint error
          return on ? parseValueString(pref.split(':')[1]) : undefined
        }
      : on => on
    return (
      <OnOffButton
        label={label}
        isOn={preferences[prefName] === prefValue(true)}
        actionFn={on => {
          if (prefValue(on) !== undefined) {
            // undefined if radio button that is off
            setPreferences({
              [prefName]: prefValue(on),
            })
            this.forceUpdate()
          }
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
        pageExplainText="Use the buttons to change the way Always In Mind does things."
        {...props}
      >
        {helpFn => [
          <this.PrefsButton
            label="Speak Help"
            helpFn={helpFn}
            helpText="Turn button help speech on orr off"
            pref="speakHelp"
            key="speakHelp"
          />,
          <this.PrefsButton
            label="Show Help"
            helpFn={helpFn}
            helpText="Turn button help display on or off"
            pref="showHelp"
            key="showHelp"
          />,
          <RadioButtonGroup key="slideshowSpeed">
            <this.PrefsButton
              group="slideshowSpeed"
              label="Slow Slideshow"
              helpFn={helpFn}
              helpText="Slowly change photos in slidehow"
              pref="slideShowRate:10000"
            />
            <this.PrefsButton
              group="slideshowSpeed"
              label="Fast Slideshow"
              helpFn={helpFn}
              helpText="Quickly change photos in slidehow"
              pref="slideShowRate:4000"
            />
          </RadioButtonGroup>,
          <RadioButtonGroup key="uiComplexity">
            <this.PrefsButton
              group="uiComplexity"
              label="Easiest Use"
              helpFn={helpFn}
              helpText="Easiest to use version"
              pref="complexity:0"
            />
            <this.PrefsButton
              group="uiComplexity"
              label="Medium Use"
              helpFn={helpFn}
              helpText="Medium to use version"
              pref="complexity:1"
            />
            <this.PrefsButton
              group="uiComplexity"
              label="Full Use"
              helpFn={helpFn}
              helpText="Fullest to use version"
              pref="complexity:2"
            />
          </RadioButtonGroup>,
        ]}
      </Page>
    )
  }
}

export const wrappedPage = withAuth(PreferencesPage)
export { wrappedPage as PreferencesPage }
