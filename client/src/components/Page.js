import React from 'react'

import { Header } from './ScreenHeader'
import { HelpModal } from './HelpModal'

import './Page.css'
import './Button.css'

import {
  preferences,
  optionallySpeak,
  stopSpeech,
} from '../drivers/preferences'

const generalHelpContent = {
  title: 'Using Always In Mind',
  text: `Press the buttons to make things happen.
The text, pictures and button colour show what will happen.
Some buttons show a new screen so you can do something new.
Press a button for more than 1 second to learn what it does.
But don't worry, just try a button and nothing bad will happen.
`,
}

const GeneralHelpModal = ({ title, text, open, closeFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    closeFn={closeFn}
    small="false"
    {...props}
  />
)

const ScreenHelpModal = ({ title, text, open, closeFn, moreFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    closeFn={closeFn}
    small="false"
    moreFn={moreFn}
    {...props}
  />
)

const ButtonHelpModal = ({ title, text, open, closeFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    closeFn={closeFn}
    small="true"
  />
)

export class Page extends React.Component {
  state = {
    showGeneralHelpModal: false,
    showScreenHelpModal: false,
    showButtonModal: false,
    buttonModalContent: { title: '', text: '' },
  }

  componentWillUnmount() {
    stopSpeech()
  }

  screenHelpTitle() {
    return `This Screen is: ${this.props.title}`
  }

  handleScreenHelp = () => {
    if (preferences.speakHelp) {
      optionallySpeak(this.screenHelpTitle())
      optionallySpeak(this.props.screenHelpText)
    }
    if (preferences.showHelp) {
      this.setState({ showScreenHelpModal: true })
    }
  }

  handleCloseModals = () => {
    this.setState({
      showGeneralHelpModal: false,
      showScreenHelpModal: false,
      showButtonModal: false,
    })
    stopSpeech()
  }

  handleMoreHelp = () => {
    if (preferences.speakHelp) {
      stopSpeech()
      optionallySpeak(generalHelpContent.title)
      optionallySpeak(generalHelpContent.text)
    }
    if (preferences.showHelp) {
      this.setState({
        showGeneralHelpModal: true,
        showScreenHelpModal: false,
      })
    }
  }

  handleButtonHelp = (label, helpText, { isOn }) => {
    const title = label ? `This button is: ${label}` : 'This button'
    const state = isOn === undefined ? '' : isOn ? 'on' : 'off'
    const text = helpText
      ? `${helpText}. It is switched ${state}.`
      : 'is not described'
    if (preferences.showHelp) {
      this.setState({
        showButtonModal: true,
        buttonModalContent: { title, text },
      })
    }
    optionallySpeak(title)
    optionallySpeak(text)
  }

  render() {
    const {
      error,
      isLoaded,
      title,
      loadingText,
      errorText,
      screenHelpText,
      children,
    } = this.props

    return (
      <div className="container">
        <GeneralHelpModal
          title={generalHelpContent.title}
          text={generalHelpContent.text}
          open={this.state.showGeneralHelpModal}
          closeFn={this.handleCloseModals}
          helpFn={this.handleButtonHelp}
        />
        <ScreenHelpModal
          title={this.screenHelpTitle()}
          text={screenHelpText}
          open={this.state.showScreenHelpModal}
          closeFn={this.handleCloseModals}
          helpFn={this.handleButtonHelp}
          moreFn={this.handleMoreHelp}
        />
        <ButtonHelpModal
          title={this.state.buttonModalContent.title}
          text={this.state.buttonModalContent.text}
          open={this.state.showButtonModal}
          closeFn={this.handleCloseModals}
          helpFn={this.handleButtonHelp}
        />
        <Header
          title={title}
          helpFn={this.handleButtonHelp}
          handleScreenHelp={this.handleScreenHelp}
        />
        {// isLoaded wil be undefined if page not wraped by withFetchJSON
        isLoaded !== undefined && isLoaded && error ? (
          <div className="page-error">
            {errorText}
            {console.log(error.message)}
          </div>
        ) : isLoaded !== undefined && !isLoaded ? (
          <div className="page-loading">{loadingText}</div>
        ) : (
          children(this.handleButtonHelp)
        )}
      </div>
    )
  }
}
