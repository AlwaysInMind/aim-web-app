import React from 'react'

import { withFetchJSON, pathTemplate } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { Button, HomeButton, BackButton } from '../components/Button.js'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

import './Info.css'

function parseReadableInfo(info) {
  const script = `<script>
  </script>`
  const style = `<style>
  body {
    font-family: 'Lato', sans-serif;
    font-size: calc((4vh + 0.4vw));
  }
  body {
    pointer-events: none;
    touch-action: none;
    user-select: none;
  }
 </style>
  `
  const inactiveInfo = info.replace(/<a/gi, '<span').replace(/<\/a/gi, '</span')
  const wrappedInfo = `<div>${inactiveInfo}</div>`

  return script + style + wrappedInfo
}

const Info = ({ title, url, content }) => {
  const displayContent = content ? parseReadableInfo(content) : undefined

  return (
    <iframe
      title="Information content"
      className="info"
      srcDoc={displayContent}
      src={url}
      referrerPolicy="origin"
      sandbox=""
    />
  )
}

class InfoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingOriginal: false,
    }
  }

  render() {
    const { url, data, ...props } = this.props
    const { complexity } = preferences
    const isOriginal = this.state.showingOriginal

    return (
      <Screen
        screen="info"
        title="View Information page"
        loadingText="Loading your information page..."
        errorText="Unable to get information page"
        screenHelpText="View the info age. Use the Down and Up buttons to see more "
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            <Info
              complexity={complexity}
              style={{ pointerEvents: 'none' }}
              title={data.title}
              url={isOriginal ? url : undefined}
              content={isOriginal ? undefined : data.content}
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
                {data.iframeCompat && (
                  <Button
                    style={{ gridArea: 'orig' }}
                    className=""
                    label={isOriginal ? 'View Readable' : 'View Web Page'}
                    actionFn={() => {
                      this.setState((prevState, props) => {
                        return { showingOriginal: !prevState.showingOriginal }
                      })
                    }}
                    helpFn={helpFn}
                    helpText={`Show the ${
                      isOriginal ? 'more readable' : 'original web'
                    } version of this information`}
                  />
                )}
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
