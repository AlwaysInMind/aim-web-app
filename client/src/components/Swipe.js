import React from 'react'
import PropTypes from 'prop-types'

export class Swipe extends React.Component {
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0,
      status: false,
      detected: false,
      delta: 50,
    }
    this.moveStart = this._moveStart.bind(this)
    this.move = this._move.bind(this)
    this.moveEnd = this._moveEnd.bind(this)
  }

  render() {
    const {
      onSwipe,
      onSwipeEnd,
      onSwipingUp,
      onSwipingRight,
      onSwipingDown,
      onSwipingLeft,
      onSwipedUp,
      onSwipedRight,
      onSwipedDown,
      onSwipedLeft,
      mouseSwipe,
      preventDefaultEvent,
      ...passThroughProps
    } = this.props

    const newProps = {
      onTouchStart: this.moveStart,
      onTouchMove: this.move,
      onTouchEnd: this.moveEnd,
      //      className: this.props.className || null,
      style: this.props.style || {},
      //    onTransitionEnd: this.props.onTransitionEnd,
      onMouseMove: mouseSwipe ? this.move : null,
      onMouseDown: mouseSwipe ? this.moveStart : null,
      onMouseUp: mouseSwipe ? this.moveEnd : null,
      ...passThroughProps,
    }
    newProps.style.touchAction = 'none'
    return React.createElement(
      this.props.nodeName || 'div',
      newProps,
      this.props.children
    )
  }

  _moveStart(e) {
    const { preventDefaultEvent } = this.props
    if (preventDefaultEvent) {
      e.preventDefault()
    }
    this.setState({
      x: parseFloat(e.clientX || e.touches[0].clientX).toFixed(2),
      y: parseFloat(e.clientY || e.touches[0].clientY).toFixed(2),
      status: true,
      detected: false,
    })
  }

  _move(e) {
    const {
      onSwipe,
      onSwipingUp,
      onSwipingRight,
      onSwipingDown,
      onSwipingLeft,
      onSwipedUp,
      onSwipedRight,
      onSwipedDown,
      onSwipedLeft,
      preventDefaultEvent,
    } = this.props
    if (this.state.status) {
      if (preventDefaultEvent) {
        e.preventDefault()
      }
      let x = parseFloat(e.clientX || e.touches[0].clientX).toFixed(2),
        y = parseFloat(e.clientY || e.touches[0].clientY).toFixed(2),
        tX = parseFloat((x - this.state.x).toFixed(2)),
        tY = parseFloat((y - this.state.y).toFixed(2))

      if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) onSwipe([tX, 0])
      else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe)
        onSwipe([0, tY])

      if (Math.abs(tX) >= this.props.delta) {
        if (tX > this.props.delta) {
          onSwipingRight(tX)
        } else if (tX < -this.props.delta) {
          onSwipingLeft(tX)
        }
      } else if (Math.abs(tY) >= this.props.delta) {
        if (tY > this.props.delta) {
          onSwipingDown(tY)
        } else if (tY < -this.props.delta) {
          onSwipingUp(tY)
        }
      }

      if (!this.state.detected) {
        if (Math.abs(parseFloat(tX)) >= this.props.delta) {
          if (parseFloat(tX) > this.props.delta) {
            onSwipedRight(true)
            this.setState({ detected: true })
          } else if (parseFloat(tX) < -this.props.delta) {
            onSwipedLeft(true)
            this.setState({ detected: true })
          }
        } else if (Math.abs(parseFloat(tY)) >= this.props.delta) {
          if (parseFloat(tY) > this.props.delta) {
            onSwipedDown(true)
            this.setState({ detected: true })
          } else if (parseFloat(tY) < -this.props.delta) {
            onSwipedUp(true)
            this.setState({ detected: true })
          }
        }
      }
    }
  }

  _moveEnd(e) {
    const { onSwipeEnd, preventDefaultEvent } = this.props
    if (preventDefaultEvent) {
      e.preventDefault()
    }
    this.setState({
      x: 0,
      y: 0,
      status: false,
      detected: false,
    })
    onSwipeEnd(true)
  }
}

Swipe.defaultProps = {
  delta: 50,
  mouseSwipe: false,
  preventDefaultEvent: false,

  onSwipe: () => {},
  onSwipeEnd: () => {},
  onSwipingUp: () => {},
  onSwipingRight: () => {},
  onSwipingDown: () => {},
  onSwipingLeft: () => {},
  onSwipedUp: () => {},
  onSwipedRight: () => {},
  onSwipedDown: () => {},
  onSwipedLeft: () => {},
  onTransitionEnd: () => {},
}
Swipe.propTypes = {
  nodeName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,

  delta: PropTypes.number,
  mouseSwipe: PropTypes.bool,
  preventDefaultEvent: PropTypes.bool,

  onSwipe: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedDown: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onTransitionEnd: PropTypes.func,
}
