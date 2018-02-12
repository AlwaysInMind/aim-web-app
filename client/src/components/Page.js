import React from 'react'

import {
  Button,
  RouterButton,
  SpeakingButton,
  AuthButton,
} from '../components/Button.js'
import HelpModal from './HelpModal'

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

const HelpButton = ({ helpFn, ...props }) => {
  return (
    <Button
      className="header-help"
      label="Explain"
      actionFn={helpFn}
      {...props}
    />
  )
}

class Page extends React.Component {
  state = {
    showModal: false,
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const {
      error,
      isLoaded,
      title,
      loadingText,
      errorText,
      pageHelpText,
      children,
    } = this.props

    return (
      <div className="container">
        <OptionsButton
          optionsPage={title === 'Options'}
          helpText="Change options"
        />
        <HelpButton helpFn={this.handleOpenModal} helpText="Learn how to use" />
        <SpeakingButton
          className="header-main"
          label={title}
          helpText={title}
        />
        <AuthButton className="header-log" helpText="Press to logout" />
        <HelpModal
          isOpen={this.state.showModal}
          closeFn={this.handleCloseModal}
        >
          <h1 className="helpPageName">{title}</h1>
          <p>{pageHelpText}</p>
        </HelpModal>
        {isLoaded !== undefined && error ? (
          <div className="page-error">
            {errorText}
            {console.log(error.message)}
          </div>
        ) : isLoaded !== undefined && !isLoaded ? (
          <div className="page-loading">{loadingText}</div>
        ) : (
          children()
        )}
      </div>
    )
  }
}

export default Page
