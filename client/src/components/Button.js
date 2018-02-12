import React from 'react'
import { withRouter } from 'react-router-dom'

import auth from '../auth/auth'
import speak from '../drivers/speech'

import './Button.css'

const Button = ({ image, label, actionFn, ...props }) => (
  <button type="button" onClick={actionFn} {...props}>
    {image ? <img className="button-image" src={image} alt="" /> : null}
    {image && label ? <br /> : null}
    {label ? <span className="button-label">{label}</span> : null}
  </button>
)

const RouterButton = withRouter(
  ({
    route,
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => <Button actionFn={() => history.push(route)} {...props} />
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
