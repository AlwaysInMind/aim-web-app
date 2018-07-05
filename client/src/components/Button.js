import React from 'react'
import { withRouter } from 'react-router-dom'

import { auth } from '../drivers/auth'
import { optionallySpeak, stopSpeech } from '../drivers/preferences'
import { mkContextHelpHandler } from '../drivers/userIntents'

import './Button.css'

export const Button = ({
  image,
  svg,
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
      {...propsPassThrough}
    >
      {svg ? (
        <object
          className="button-svg"
          type="image/svg+xml"
          data={svg}
          style={{ fill: 'red' }}
          aria-label=""
        />
      ) : null}
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

export class SpeakingButton extends React.Component {
  constructor(props) {
    super(props)
    this.t = undefined
  }

  speak() {
    const { label, helpText } = this.props
    optionallySpeak(label ? label : helpText)
  }

  componentDidMount() {
    const { announceOnLoad } = this.props
    if (announceOnLoad) {
      this.t = setTimeout(() => {
        this.speak()
      }, 800)
    }
  }

  componentWillUnmount() {
    if (this.t) {
      clearTimeout(this.t)
    }
    stopSpeech()
  }

  render() {
    const { label, helpText, announceOnLoad, ...props } = this.props
    return (
      <Button
        actionFn={() => this.speak()}
        label={label}
        helpText={helpText}
        {...props}
      />
    )
  }
}

export const ExplainButton = ({ explainFn, ...props }) => {
  return (
    <Button
      className="button-explain"
      label="Help"
      actionFn={explainFn}
      {...props}
    />
  )
}

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
