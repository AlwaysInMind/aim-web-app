import React from 'react'
import { withRouter } from 'react-router-dom'

import { auth } from '../auth/auth'
import { speak } from '../drivers/speech'
import { mkLongPressFunction } from '../drivers/longpress'

import './Button.css'

const Button = ({ image, label, actionFn, helpFn, helpText, ...props }) => {
  const detectLongPress = mkLongPressFunction(actionFn, () => helpFn(helpText))
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

const mkToggleButtonL = ({
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

const mkToggleButton = ({
  actionA,
  actionB,
  labelA,
  labelB,
  imageA,
  imageB,
}) => {
  return class _ extends React.Component {
    render() {
      const { stateB, ...props } = this.props
      return (
        <Button
          actionFn={stateB ? actionB : actionA}
          label={stateB ? labelB : labelA}
          image={stateB ? imageB : imageA}
          {...props}
        />
      )
    }
  }
}

const PauseButton = ({ isPlaying, playFn, ...props }) => {
  const PauseButton = mkToggleButton({
    labelA: 'Play',
    labelB: 'Pause',
    actionA: () => playFn(true),
    actionB: () => playFn(false),
  })
  return <PauseButton stateB={isPlaying} {...props} />
}

const PauseButtonL = ({ pausable, ...props }) => {
  const ToggleButton = mkToggleButtonL({
    labelA: 'Play',
    labelB: 'Pause',
    actionA: pausable.play,
    actionB: pausable.pause,
  })
  pausable.play()
  return <ToggleButton stateFn={pausable.isPlaying} {...props} />
}

const AuthButton = props => {
  const ToggleButton = mkToggleButtonL({
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
