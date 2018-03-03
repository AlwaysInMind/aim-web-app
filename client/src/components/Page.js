import React from 'react'

import {
  Button,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'
import { HelpModal } from './HelpModal'

import './Page.css'
import './Button.css'

import {
  preferences,
  optionallySpeak,
  stopSpeech,
} from '../drivers/preferences'

const PreferencesButton = ({ PreferencesPage, ...props }) =>
  !PreferencesPage ? (
    <RouterButton
      route="/preferences"
      className="header-preferences"
      image={`${process.env.PUBLIC_URL}/preferences.svg`}
      helpText="Change Preferences"
      {...props}
    />
  ) : (
    <RouterButton
      route="!goBack"
      className="header-preferences"
      label="Back"
      helpText="Return to Always in Mind"
      {...props}
    />
  )

const ExplainButton = ({ explainFn, ...props }) => {
  return (
    <Button
      className="header-help"
      label="Explain"
      actionFn={explainFn}
      {...props}
    />
  )
}
const Header = ({ title, helpFn, handleScreenHelp }) => (
  <React.Fragment>
    <PreferencesButton
      PreferencesPage={title === 'Preferences'}
      helpFn={helpFn}
    />
    <ExplainButton
      explainFn={handleScreenHelp}
      helpText="Learn how to use this screen"
      helpFn={helpFn}
    />
    <SpeakingButton
      className="header-main"
      label={title}
      helpText={title}
      helpFn={helpFn}
    />
    <AuthButton
      className="header-log"
      helpText="Stop using Always In Mind"
      helpFn={helpFn}
    />
  </React.Fragment>
)

/*<p>
<strong>Press the buttons to make things happen</strong>. They have text
or pictures that say what will happen. Some buttons like the big one
above, will just speak. Other buttons take you to different screen so you
can do something else. More Buttons do something useful. The button color
also gives a clue to what they do.
</p>
<p>
<strong>Long press a button for 1 second to find out what it does</strong>.
If you are unsure what a button will do, don't worry. Just try it and
nothing serious will happen.
</p>


*/

const ExplainModal = ({ title, text, open, closeFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    closeFn={closeFn}
    small="false"
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
    showExplainModal: false,
    showButtonModal: false,
    buttonModalText: '',
  }

  componentWillUnmount() {
    stopSpeech()
  }

  titleExplainText() {
    return `This Screen is: ${this.props.title}`
  }

  handleScreenHelp = () => {
    if (preferences.speakHelp) {
      optionallySpeak(this.titleExplainText())
      optionallySpeak(this.props.pageExplainText)
    }
    if (preferences.showHelp) {
      this.setState({ showExplainModal: true })
    }
  }

  handleCloseModals = () => {
    this.setState({ showExplainModal: false, showButtonModal: false })
    stopSpeech()
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
      pageExplainText,
      children,
    } = this.props

    return (
      <div className="container">
        <ExplainModal
          title={this.titleExplainText()}
          text={pageExplainText}
          open={this.state.showExplainModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
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
