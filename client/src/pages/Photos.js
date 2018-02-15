import React from 'react'

import withFetchJSON, { pathTemplate } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { BackButton, PauseButton } from '../components/Button.js'
import Page from '../components/Page'
import mkSlideShow from '../components/SlideShow'
import Preferences from '../drivers/preferences'

import '../components/SlideShow.css'

const btn = { gridColumn: 'span 2' }

class PhotosPage extends React.Component {
  componentDidMount() {
    this.slideShow = mkSlideShow(Preferences.preferences.slideshowRate)
    setTimeout(() => {
      this.slideShow.isPlaying = true
      this.update()
    }, 5000) // let all the slides load
  }

  componentWillUnmount() {
    this.slideShow.isPlaying = false
    this.slideShow = undefined
  }

  update = () => this.forceUpdate()

  render() {
    const { data, ...props } = this.props
    return (
      <Page
        title="View Photos"
        loadingText="Loading your photos..."
        errorText="Unable to get photos"
        pageExplainText="Watch the photo slideshow. You can stop the photos changing with the pause button and then start again with the play button."
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
              isPlaying={this.slideShow.isPlaying}
              playFn={play => {
                this.slideShow.isPlaying = play
                this.update()
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

export default withAuth(
  withFetchJSON(PhotosPage, pathTemplate`/api/albums/${'id'}`)
)
