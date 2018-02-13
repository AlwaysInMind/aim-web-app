import React from 'react'

import {
  Button,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'
import HelpModal from './HelpModal'
import speak from '../drivers/speech'

import './Page.css'
import './Button.css'

const OptionsButton = ({ optionsPage, ...props }) =>
  !optionsPage ? (
    <RouterButton
      route="/options"
      className="header-options"
      image={`${process.env.PUBLIC_URL}/options.svg`}
      {...props}
    />
  ) : (
    <RouterButton route="/" className="header-options" label="Back" />
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
const Header = ({ title, helpFn, handleOpenModal }) => (
  <React.Fragment>
    <OptionsButton
      optionsPage={title === 'Options'}
      helpText="Change options"
      helpFn={helpFn}
    />
    <ExplainButton
      explainFn={handleOpenModal}
      helpText="Learn how to use Always In Mind"
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

const ExplainModal = ({ subtitle, text, isOpen, closeFn, ...props }) => (
  <HelpModal
    isOpen={isOpen}
    closeFn={closeFn}
    small="false"
    title="How to use Always In Mind"
    {...props}
  >
    <p>
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

    <h1 className="helpPageName">{subtitle}</h1>
    <p>{text}</p>
  </HelpModal>
)

const ButtonHelpModal = ({ isOpen, closeFn, text, ...props }) => (
  <HelpModal
    isOpen={isOpen}
    closeFn={closeFn}
    small="true"
    title="With this button you can..."
    {...props}
  >
    <p>{text}</p>
  </HelpModal>
)

class Page extends React.Component {
  state = {
    showExplainModal: false,
    showButtonModal: false,
    buttonModalText: '',
  }

  handleOpenModal = () => {
    this.setState({ showExplainModal: true })
  }

  handleCloseModals = () => {
    this.setState({ showExplainModal: false, showButtonModal: false })
  }

  helpFn = helpText => {
    const helpText2 =
      (helpText ? helpText : 'This button is not described') + '.'
    this.setState({ showButtonModal: true, buttonModalText: helpText2 })
    speak(helpText2)
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
          title="How to use Always In Mind"
          subtitle={`This Screen is: ${title}`}
          text={pageExplainText}
          isOpen={this.state.showExplainModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
        />
        <ButtonHelpModal
          text={this.state.buttonModalText}
          isOpen={this.state.showButtonModal}
          closeFn={this.handleCloseModals}
          helpFn={this.helpFn}
        />
        <Header
          title={title}
          helpFn={this.helpFn}
          handleOpenModal={this.handleOpenModal}
        />
        {isLoaded !== undefined && error ? (
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

export default Page
