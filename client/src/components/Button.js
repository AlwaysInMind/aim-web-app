import React from 'react'
import { withRouter } from 'react-router-dom'

import { auth } from '../drivers/auth'
import { speak } from '../drivers/speech'
import { mkLongPressFunction } from '../drivers/longpress'

import './Button.css'

export const Button = ({
  image,
  label,
  actionFn,
  helpFn,
  helpText,
  ...props
}) => {
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

export const RouterButton = withRouter(
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

export const BackButton = withRouter(
  ({
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => <Button actionFn={() => history.goBack()} {...props} />
)

export const HomeButton = withRouter(
  ({
    history,
    match: ignore1,
    location: ignore2,
    staticContext: ignore3,
    ...props
  }) => <Button actionFn={() => history.push('/')} {...props} />
)

export const SpeakingButton = ({ label, ...props }) => (
  <Button actionFn={() => speak(label + '.')} label={label} {...props} />
)

export const mkToggleButton = ({
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

export const OnOffButton = ({ label, isOn, actionFn, ...props }) => {
  const OnOffButton = mkToggleButton({
    labelA: label,
    labelB: label,
    imageA: `${process.env.PUBLIC_URL}/Blue_Light_Icon.svg`,
    imageB: `${process.env.PUBLIC_URL}/Yellow_Light_Icon.svg`,
    actionA: () => actionFn(true),
    actionB: () => actionFn(false),
  })
  return <OnOffButton stateB={isOn} {...props} />
}

export const PauseButton = ({ isPlaying, playFn, ...props }) => {
  const PauseButton = mkToggleButton({
    labelA: 'Play',
    labelB: 'Pause',
    actionA: () => playFn(true),
    actionB: () => playFn(false),
  })
  return <PauseButton stateB={isPlaying} {...props} />
}

export const AuthButton = ({ ...props }) => {
  const ToggleButton = mkToggleButton({
    labelA: 'Login',
    labelB: 'Logout',
    actionA: () => auth.login(),
    actionB: () => auth.logout(),
  })
  return <ToggleButton stateB={auth.isAuthenticated} {...props} />
}
