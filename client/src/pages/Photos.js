import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { BackButton, PauseButton } from '../components/Button.js'
import Page from '../components/Page'
import mkSlideShow from '../components/SlideShow'

import '../components/SlideShow.css'

const options = { slideshowRate: 5000 }

const btn = { gridColumn: 'span 2' }

class Photos extends React.Component {
  constructor(props) {
    super(props)
    this.slideShow = mkSlideShow(options.slideshowRate)
  }

  componentWillUnmount() {
    this.slideShow.kill()
  }

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
              pausable={this.slideShow}
              helpFn={helpFn}
              helpText="Pause or restart the slideshow"
            />,
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
