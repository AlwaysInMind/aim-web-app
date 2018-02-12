import React from 'react'
import { withRouter } from 'react-router-dom'

import auth from '../auth/auth'
import speak from '../drivers/speech'

import './Button.css'

function helpFn(helpText) {
  speak(helpText + '.')
}

const mkf = (actionFn, helpText) => {
  let t
  let l
  return e => {
    const type = e.type
    const isStartEvent = new Set(['mousedown', 'keydown', 'touchstart']).has(
      type
    )
    const isEndEvent = new Set(['mouseup', 'keyup', 'touchend']).has(type)
    const isMatchingEvent =
      isEndEvent &&
      { mouseup: 'mousedown', keyup: 'keydown', touchstart: 'touchend' }[
        type
      ] === l
    // TODO we assume end event will match start event
    if (isStartEvent) {
      l = type
      t = setTimeout(() => {
        t = undefined
      }, 1000)
    } else if (isMatchingEvent && t) {
      clearTimeout(t)
      t = l = undefined
      actionFn(e)
    } else if (isMatchingEvent && !t) {
      l = undefined
      helpFn(helpText)
    }
  }
}

const Button = ({ image, label, actionFn, helpText, ...props }) => {
  const detectLongPress = mkf(actionFn, helpText)
  return (
    <button
      type="button"
      onMouseDown={detectLongPress}
      onMouseUp={detectLongPress}
      onKeyDown={detectLongPress}
      onKeyUp={detectLongPress}
      onTouchStart={detectLongPress}
      onTouchEnd={detectLongPress}
      {...props}
    >
      {image ? <img className="button-image" src={image} alt="" /> : null}
      {image && label ? <br /> : null}
      {label ? <span className="button-label">{label}</span> : null}
    </button>
  )
}

const RouterButton = withRouter(
  ({
    route,
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => {
    return <Button actionFn={() => history.push(route)} {...props} />
  }
)

const BackButton = withRouter(
  ({
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => <Button actionFn={() => history.goBack()} {...props} />
)

const HomeButton = withRouter(
  ({
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => <Button actionFn={() => history.push('/')} {...props} />
)

const SpeakingButton = ({ label, ...props }) => (
  <Button actionFn={() => speak(label + '.')} label={label} {...props} />
)

const mkToggleButton = ({
  actionA,
  actionB,
  labelA,
  labelB,
  imageA,
  imageB,
}) => {
  return class _ extends React.Component {
    update = () => this.forceUpdate()
    render() {
      const { stateFn, ...props } = this.props
      const state = stateFn()
      return (
        <Button
          actionFn={() => {
            ;(stateFn() ? actionB : actionA)()
            this.update()
          }}
          label={state ? labelB : labelA}
          image={state ? imageB : imageA}
          {...props}
        />
      )
    }
  }
}

const PauseButton = ({ pausable, ...props }) => {
  const ToggleButton = mkToggleButton({
    labelA: 'Play',
    labelB: 'Pause',
    actionA: pausable.play,
    actionB: pausable.pause,
  })
  pausable.play()
  return <ToggleButton stateFn={pausable.isPlaying} {...props} />
}

const AuthButton = props => {
  const ToggleButton = mkToggleButton({
    labelA: 'Login',
    labelB: 'Logout',
    actionA: auth.login,
    actionB: auth.logout,
  })
  return <ToggleButton stateFn={() => auth.isAuthenticated} {...props} />
}

export {
  Button,
  RouterButton,
  BackButton,
  HomeButton,
  SpeakingButton,
  AuthButton,
  PauseButton,
}
