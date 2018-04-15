import React from 'react'

import './SlideShow.css'

// for now this is a pure DOM component - just updates classes
function mkSlideShow(rate = 3000) {
  var slides
  var currentSlide = -1
  var timerID

  const getSlides = () => document.querySelectorAll('.slides .slide')
  const nextSlide = (slides, slide) => (slide + 1) % slides.length
  const showSlide = (slides, slide) => {
    slides[slide].className = 'slide showing'
  }
  const hideSlide = (slides, slide) => {
    slides[slide].className = 'slide'
  }
  const slideIsVideo = (slides, slide) => {
    const node = slides[slide].children[0]
    return node.tagName === 'VIDEO'
  }
  const setSlideEndEventHandler = (slides, slide, add, handler) => {
    const node = slides[slide].children[0]
    if (add) {
      node.addEventListener('ended', handler)
    } else {
      node.removeEventListener('ended', handler)
    }
  }
  const playSlide = (slides, slide, play) => {
    if (slideIsVideo(slides, slide)) {
      const node = slides[slide].children[0]
      if (play) {
        node.play()
      } else {
        node.pause()
      }
    }
  }

  function start() {
    if (!slides) {
      slides = getSlides()
    }
    advanceSlide(true)
  }

  function stop() {
    if (!slides) {
      return
    }
    if (slideIsVideo(slides, currentSlide)) {
      playSlide(slides, currentSlide, false)
      setSlideEndEventHandler(slides, currentSlide, false, advanceSlide)
    }

    if (timerID) {
      clearTimeout(timerID)
      timerID = undefined
    }
  }

  function advanceSlide(resume) {
    if (currentSlide === -1) {
      currentSlide = 0
    } else {
      if (slideIsVideo(slides, currentSlide) && !resume) {
        clearTimeout(timerID)
        setSlideEndEventHandler(slides, currentSlide, false, advanceSlide)
        playSlide(slides, currentSlide, false)
      }
      if (!slideIsVideo(slides, currentSlide) || !resume) {
        hideSlide(slides, currentSlide)
        currentSlide = nextSlide(slides, currentSlide)
      }
    }
    if (slideIsVideo(slides, currentSlide)) {
      timerID = setInterval(advanceSlide, rate * 100)
      setSlideEndEventHandler(slides, currentSlide, true, () => {
        advanceSlide(false)
      })
      playSlide(slides, currentSlide, true)
    } else {
      timerID = setTimeout(advanceSlide, rate)
    }
    showSlide(slides, currentSlide)
  }

  return {
    get isPlaying() {
      return timerID !== undefined
    },
    set isPlaying(play) {
      play ? start() : stop()
    },
  }
}

export class SlideShow extends React.Component {
  constructor(props) {
    super(props)
    this.slideShow = mkSlideShow(this.props.rate)
  }

  componentDidUpdate() {
    if (this.props.media) {
      this.slideShow.isPlaying = this.props.playing
    }
  }

  componentWillUnmount() {
    this.slideShow = undefined
  }

  render() {
    const { media } = this.props

    return (
      <div className="slides-container">
        <ul className="slides">
          {media.map(item => (
            <li className="slide" key={item.id}>
              {item.medium === 'image' ? (
                <img style={{ display: 'block' }} src={item.src} alt="" />
              ) : (
                <video
                  style={{ width: '100%', height: '100%' }}
                  playsInline="true"
                  src={item.src}
                />
              )}
            </li>
          ))}{' '}
        </ul>
      </div>
    )
  }
}
