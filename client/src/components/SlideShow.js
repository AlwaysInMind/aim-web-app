import React from 'react'

import './SlideShow.css'

// for now this is a pure DOM component - just updates classes
function mkSlideShow(rate = 3000, onChange) {
  var slides
  var currentSlide = -1
  var playing = false
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
  const notify = (slides, slide) => {
    if (playing) {
      const caption = slides[currentSlide].childNodes[0].alt
      onChange(caption ? caption : '')
    }
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
    playing = true
    advanceSlide(true)
  }

  function stop() {
    if (!slides) {
      return
    }
    if (slideIsVideo(slides, currentSlide)) {
      playSlide(slides, currentSlide, false)
    } else if (timerID) {
      clearTimeout(timerID)
      timerID = undefined
    }
    playing = false
  }

  function onVideoEnd() {
    setSlideEndEventHandler(slides, currentSlide, false, onVideoEnd)
    //        playSlide(slides, currentSlide, false)
    advanceSlide(false)
  }

  function advanceSlide(resume) {
    if (currentSlide === -1) {
      currentSlide = 0
      notify(slides, currentSlide)
    } else {
      if (!(slideIsVideo(slides, currentSlide) && resume)) {
        hideSlide(slides, currentSlide)
        currentSlide = nextSlide(slides, currentSlide)
        notify(slides, currentSlide)
      }
    }
    showSlide(slides, currentSlide)
    if (slideIsVideo(slides, currentSlide)) {
      setSlideEndEventHandler(slides, currentSlide, true, onVideoEnd)
      playSlide(slides, currentSlide, true)
    } else {
      timerID = setTimeout(advanceSlide, rate)
    }
  }

  return {
    get isPlaying() {
      return playing
    },
    set isPlaying(play) {
      if (play && !playing) {
        start()
      } else if (!play && playing) {
        stop()
      }
    },
  }
}

export class SlideShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { caption: '' }
    this.slideShow = mkSlideShow(this.props.rate, props.onChangeCaption)
  }

  componentDidUpdate() {
    if (this.props.media) {
      console.log('du')
      this.slideShow.isPlaying = this.props.playing
    }
  }

  componentWillUnmount() {
    this.slideShow.isPlaying = false
    this.slideShow = undefined
  }

  render() {
    const { media, style } = this.props

    return (
      <div className="slides-container" style={style}>
        <ul className="slides">
          {media.map(item => (
            <li className="slide" key={item.id}>
              {item.medium === 'image' ? (
                <img
                  style={{ display: 'block' }}
                  src={item.src}
                  alt={item.description}
                />
              ) : (
                <video
                  style={{ width: '100%', height: '100%' }}
                  playsInline="true"
                  src={item.src}
                  muted="true"
                />
              )}
            </li>
          ))}{' '}
        </ul>
      </div>
    )
  }
}
