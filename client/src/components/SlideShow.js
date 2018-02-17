// for now is a pure DOM component with no rendering - just updates classes
import './SlideShow.css'

export function mkSlideShow(rate = 3000) {
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

  function start() {
    if (!timerID) {
      if (currentSlide !== -1) {
        advanceSlide()
      } else {
        currentSlide = 0
        slides = getSlides()
        showSlide(slides, 0)
      }
      timerID = setInterval(advanceSlide, rate)
    }
  }
  function stop() {
    if (timerID) {
      clearInterval(timerID)
      timerID = undefined
    }
  }

  function advanceSlide() {
    hideSlide(slides, currentSlide)
    currentSlide = nextSlide(slides, currentSlide)
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
