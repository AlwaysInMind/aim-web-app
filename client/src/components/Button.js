import React from 'react'
import { withRouter } from 'react-router-dom'

import { auth } from '../drivers/auth'
import { optionallySpeak } from '../drivers/preferences'
import { mkContextHelpHandler } from '../drivers/userIntents'

import './Button.css'

export const Button = ({
  image,
  label,
  actionFn,
  helpFn,
  helpText,
  ...props
}) => {
  const buttonInputHandler = mkContextHelpHandler(actionFn, () => {
    helpFn(label, helpText, props)
  })

  const { isOn, ...propsPassThrough } = props

  return (
    <button
      type="button"
      onMouseDown={buttonInputHandler}
      onMouseUp={buttonInputHandler}
      onKeyDown={buttonInputHandler}
      onKeyUp={buttonInputHandler}
      onTouchStart={buttonInputHandler}
      onTouchEnd={buttonInputHandler}
      {...propsPassThrough}
    >
      {image ? <img className="button-image" src={image} alt="" /> : null}
      {label ? <p className="button-label">{label}</p> : null}
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
    const fn =
      route === '!goBack'
        ? () => history.goBack()
        : route === '!goHome'
          ? () => history.push('/')
          : () => history.push(route)
    return <Button actionFn={fn} {...props} />
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
  <Button actionFn={() => optionallySpeak(label)} label={label} {...props} />
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
  return <OnOffButton stateB={isOn} isOn={isOn} {...props} />
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
    labelA: 'Start',
    labelB: 'Finish',
    actionA: () => {
      auth.login()
    },
    actionB: () => {
      auth.logout()
    },
  })
  return <ToggleButton stateB={auth.isAuthenticated} {...props} />
}
