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

const generalHelpTitle = 'Using Always In Mind'
const generalHelpText = `Press the buttons to make things happen.
The text, pictures and button colour show what will happen.
Some buttons show a new screen so you can do something new.
Press a button for more than 1 second to learn what it does.
But don't worry, just try a button and nothing bad will happen.
`

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
    title={'With this button you can...'}
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
    buttonModalText: '',
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
      optionallySpeak(generalHelpTitle)
      optionallySpeak(generalHelpText)
    }
    if (preferences.showHelp) {
      this.setState({
        showGeneralHelpModal: true,
        showScreenHelpModal: false,
      })
    }
  }

  helpFn = helpText => {
    const helpText2 =
      (helpText ? helpText : 'This button is not described') + '.'
    this.setState({
      showButtonModal: preferences.showHelp,
      buttonModalText: helpText2,
    })
    optionallySpeak(helpText2)
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
          title={generalHelpTitle}
          text={generalHelpText}
          open={this.state.showGeneralHelpModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
        />
        <ScreenHelpModal
          title={this.screenHelpTitle()}
          text={screenHelpText}
          open={this.state.showScreenHelpModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
          moreFn={this.handleMoreHelp}
        />
        <ButtonHelpModal
          text={this.state.buttonModalText}
          open={this.state.showButtonModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
        />
        <Header
          title={title}
          helpFn={this.helpFn}
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
          children(this.helpFn)
        )}
      </div>
    )
  }
}
