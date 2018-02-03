import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'

const TIMER_INTERVAL = 3000

class Photos extends React.Component {
  componentDidUpdate() {
    var slides = document.querySelectorAll('#slides .slide')
    var currentSlide = 0
    if (!this.timerID) {
      this.timerID = setInterval(nextSlide, TIMER_INTERVAL)
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
      <div>
        {error ? (
          <div>
            Unable to get photos
            {console.log(error.message)}
          </div>
        ) : !isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div>
            <ul id="slides">
              {data.length
                ? data.map(item => (
                    <li className="slide" key={item.id}>
                      <img src={item.src} alt="" />
                    </li>
                  ))
                : 'No photos'}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
