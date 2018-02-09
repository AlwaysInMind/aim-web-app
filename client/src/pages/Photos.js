import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { Button, AuthButton } from '../components/Button.js'

const options = { slideshowRate: 5000 }

class Photos extends React.Component {
  componentDidUpdate() {
    var slides = document.querySelectorAll('.slides .slide')
    var currentSlide = 0
    slides[currentSlide].className = 'slide showing'
    if (!this.timerID) {
      this.timerID = setInterval(nextSlide, options.slideshowRate)
    }

    function nextSlide() {
      slides[currentSlide].className = 'slide'
      currentSlide = (currentSlide + 1) % slides.length
      slides[currentSlide].className = 'slide showing'
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    const { error, isLoaded, data } = this.props

    return (
      <React.Fragment>
        <Button className="header-main" label="View photos" />
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
            <Button
              className="button-goback"
              label="More Photos"
              action={{ verb: 'goback' }}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
