import React from 'react'

import { withFetchJSON, pathTemplate } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, PauseButton } from '../components/Button.js'
import { Screen } from '../components/Screen'
import { SlideShow } from '../components/SlideShow'
import { preferences } from '../drivers/preferences'

import '../components/SlideShow.css'
import './Photos.css'

class PhotosScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      slideShowIsPlaying: false,
    }
  }

  didLoadCalled = false

  componentDidUpdate() {
    if (this.props.data && !this.didLoadCalled) {
      this.didLoadCalled = true
      this.setState({ slideShowIsPlaying: true })
    }
  }

  render() {
    const { data, ...props } = this.props
    const { complexity } = preferences

    return (
      <Screen
        screen="photos"
        title="View Photos"
        loadingText="Loading your photos..."
        errorText="Unable to get photos"
        screenHelpText="Watch the photo slideshow. Use the Pause button to stop the slideshow. Use the Play button to start again."
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            {data.length ? (
              <SlideShow
                media={data}
                rate={preferences.slideShowRate}
                playing={this.state.slideShowIsPlaying}
              />
            ) : (
              'No photos'
            )}

            {complexity > 0 && (
              <React.Fragment>
                <BackButton
                  style={{ gridColumn: 'span 2', gridArea: 'back' }}
                  className="button-router"
                  label="More Photos"
                  helpFn={helpFn}
                  helpText="Choose another photo Album"
                />
                <PauseButton
                  style={{ gridColumn: 'span 2', gridArea: 'pause' }}
                  className="button-pause"
                  isPlaying={this.state.slideShowIsPlaying}
                  playFn={play => {
                    this.setState({ slideShowIsPlaying: play })
                  }}
                  helpFn={helpFn}
                  helpText="Pause or restart the slideshow"
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
  withFetchJSON(PhotosScreen, pathTemplate`/api/albums/${'id'}`)
)
export { wrappedScreen as PhotosScreen }
