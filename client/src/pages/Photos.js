import React from 'react'

import { withFetchJSON, pathTemplate } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, PauseButton } from '../components/Button.js'
import { Page } from '../components/Page'
import { mkSlideShow } from '../components/SlideShow'
import { preferences } from '../drivers/preferences'

import '../components/SlideShow.css'

const btn = { gridColumn: 'span 2' }

class PhotosPage extends React.Component {
  constructor(props) {
    super(props)
    this.slideShow = mkSlideShow(preferences.slideShowRate)
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
    if (this.props.data) {
      this.slideShow.isPlaying = this.state.slideShowIsPlaying
    }
  }

  componentWillUnmount() {
    this.slideShow.isPlaying = false
    this.slideShow = undefined
  }

  render() {
    const { data, ...props } = this.props
    return (
      <Page
        title="View Photos"
        loadingText="Loading your photos..."
        errorText="Unable to get photos"
        screenHelpText="Watch the photo slideshow. Use the Pause button to stop the slideshow. Use the Play button to start again."
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            <div className="slides-container">
              <ul className="slides">
                {data.length
                  ? data.map(item => (
                      <li className="slide" key={item.id}>
                        <img
                          style={{ display: 'block' }}
                          src={item.src}
                          alt=""
                        />
                      </li>
                    ))
                  : 'No photos'}
              </ul>
            </div>
            <BackButton
              style={btn}
              className="button-router"
              label="See More Photos"
              helpFn={helpFn}
              helpText="Choose another photo Album"
            />
            <PauseButton
              style={btn}
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
      </Page>
    )
  }
}

const wrappedPage = withAuth(
  withFetchJSON(PhotosPage, pathTemplate`/api/albums/${'id'}`)
)
export { wrappedPage as PhotosPage }
