import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import {
  SpeakingButton,
  BackButton,
  AuthButton,
  PauseButton,
} from '../components/Button.js'
import mkSlideShow from '../components/SlideShow'

const options = { slideshowRate: 5000 }

class Photos extends React.Component {
  constructor(props) {
    super(props)
    this.slideShow = mkSlideShow(options.slideshowRate)
  }

  componentDidUpdate() {
    this.slideShow.play()
  }

  componentWillUnmount() {
    this.slideShow.kill()
  }

  render() {
    const { error, isLoaded, data } = this.props

    return (
      <React.Fragment>
        <SpeakingButton className="header-main" label="View photos" />
        <AuthButton className="header-log" />
        {error ? (
          <div className="page-error">
            Unable to get photos
            {console.log(error.message)}
          </div>
        ) : !isLoaded ? (
          <div className="page-loading">Loading your photos...</div>
        ) : (
          <React.Fragment>
            <div className="slides-container">
              <ul style={{ display: 'block' }} className="slides">
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
            <BackButton className="button-goback" label="More Photos" />
            <PauseButton className="button-pause" pausable={this.slideShow} />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
