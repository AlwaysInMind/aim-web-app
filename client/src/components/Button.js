import React from 'react'
import { withRouter } from 'react-router-dom'

import auth from '../auth/auth'
import speak from '../drivers/speech'

const Button = ({ image, label, actionFn, ...props }) => (
  <button type="button" onClick={actionFn} {...props}>
    {image ? <img className="button-image" src={image} alt="" /> : ''}
    {image && label ? <br /> : ''}
    {label ? <span className="button-label">{label}</span> : ''}
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

const SpeakingButton = ({ label, ...props }) => (
  <Button actionFn={() => speak(label)} label={label} {...props} />
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
      return (
        <Button
          actionFn={() => {
            ;(stateFn() ? actionB : actionA)()
            this.update()
          }}
          label={stateFn() ? labelB : labelA}
          image={stateFn() ? imageB : imageA}
          {...props}
        />
      )
    }
  }
}

const PauseButton = ({ pausable, ...props }) => {
  const ToggleButton = mkToggleButton({
    labelA: 'Pause',
    labelB: 'Play',
    actionA: pausable.pause,
    actionB: pausable.play,
  })
  return <ToggleButton stateFn={() => !pausable.isPlaying()} {...props} />
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
  SpeakingButton,
  AuthButton,
  PauseButton,
}
