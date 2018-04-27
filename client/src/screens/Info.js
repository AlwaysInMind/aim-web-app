import React from 'react'

import { withFetchJSON, pathTemplate } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { HomeButton, BackButton } from '../components/Button.js'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

import './Info.css'

const Info = ({ title, content }) => {
  return (
    <iframe
      title="infoIframe"
      className="info"
      srcDoc={content}
      //      src={url}
      referrerPolicy="origin"
      sandbox=""
    />
  )
}

class InfoScreen extends React.Component {
  render() {
    const { data, ...props } = this.props
    const { complexity } = preferences

    return (
      <Screen
        screen="info"
        title="View Information page"
        loadingText="Loading your page..."
        errorText="Unable to get page"
        screenHelpText="View the info age. Use the Down and Up buttons to see more "
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            <Info
              style={{ zpointerEvents: 'none' }}
              title={data.title}
              content={data.content}
            />

            {complexity === 0 && (
              <HomeButton
                style={{ gridArea: 'home' }}
                className="button-router"
                label="More..."
                helpFn={helpFn}
                helpText="Choose more things to do"
              />
            )}
            {complexity > 0 && (
              <React.Fragment>
                <BackButton
                  style={{ gridArea: 'back' }}
                  className="button-router"
                  label="More Info"
                  helpFn={helpFn}
                  helpText="Choose another Info page"
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Screen>
    )
  }
}

const wrappedScreen = withAuth(
  withFetchJSON(InfoScreen, pathTemplate`/api/readable/${'url'}`)
)
export { wrappedScreen as InfoScreen }
