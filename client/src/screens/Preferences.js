import React from 'react'

import { OnOffButton } from '../components/Button.js'
import { Screen } from '../components/Screen'
import { withAuth } from '../hocs/withAuth'
import { preferences, setPreferences } from '../drivers/preferences'

import './Preferences.css'

const rgStyle = span => ({
  gridColumn: `span ${span}`,
})

const ButtonGroup = ({ label, span, children }) => (
  <div className="prefs-group" style={rgStyle(span)}>
    <label className="prefs-group-label">{label}</label>
    <div className="prefs-group-buttons">{children.map(child => child)}</div>
  </div>
)

function parsePref(pref) {
  const parseValueString = valueString => JSON.parse(`{"v":${valueString}}`).v
  const prefName = pref.includes(':') ? pref.split(':')[0] : pref
  const prefValue = pref.includes(':')
    ? on => {
        // use statment to avoid mysterious eslint error
        return on ? parseValueString(pref.split(':')[1]) : undefined
      }
    : on => on
  return { prefName, prefValue }
}

class PreferencesScreen extends React.Component {
  PrefsButton = ({ label, pref, ...props }) => {
    const { prefName, prefValue } = parsePref(pref)
    return (
      <OnOffButton
        className="prefs-button"
        label={label}
        isOn={preferences[prefName] === prefValue(true)}
        actionFn={on => {
          if (prefValue(on) !== undefined) {
            // undefined if radio button that is off
            setPreferences({
              [prefName]: prefValue(on),
            })
            this.forceUpdate() // redraw entire screen
          }
        }}
        {...props}
      />
    )
  }

  render() {
    const { auth, ...props } = this.props
    return (
      <Screen
        title="Preferences"
        loadingText=""
        errorText=""
        screenHelpText="Use the buttons to change the way Always In Mind works."
        {...props}
      >
        {helpFn => [
          <ButtonGroup label="Help" span="4" key="help">
            <this.PrefsButton
              label="Speak"
              helpFn={helpFn}
              helpText="Turns help speech on or off"
              pref="speakHelp"
            />
            <this.PrefsButton
              label="Show"
              helpFn={helpFn}
              helpText="Turns help display on or off"
              pref="showHelp"
            />
          </ButtonGroup>,
          <ButtonGroup label="Slideshow Speed" span="4" key="slideshowSpeed">
            <this.PrefsButton
              label="Fast"
              helpFn={helpFn}
              helpText="Quickly change slide show photos"
              pref="slideShowRate:4000"
            />
            <this.PrefsButton
              label="Slow"
              helpFn={helpFn}
              helpText="Slowly change slide show photos"
              pref="slideShowRate:10000"
            />
          </ButtonGroup>,
          <ButtonGroup label="Ease of Use" span="6" key="uiComplexity">
            <this.PrefsButton
              label="Easiest"
              helpFn={helpFn}
              helpText="Easiest ease of use"
              pref="complexity:0"
            />
            <this.PrefsButton
              label="Medium"
              helpFn={helpFn}
              helpText="Average ease of use"
              pref="complexity:1"
            />
            <this.PrefsButton
              label="Full Use"
              helpFn={helpFn}
              helpText="Most complicated ease of use"
              pref="complexity:2"
            />
          </ButtonGroup>,
        ]}
      </Screen>
    )
  }
}

export const wrappedScreen = withAuth(PreferencesScreen)
export { wrappedScreen as PreferencesScreen }
