import React from 'react'

import { Header } from './Header'
import { SupporterBar } from './SupporterBar'
import { HelpModal } from './HelpModal'
import { Swipe } from './Swipe'

import './Screen.css'
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

const ScreenGrid = ({ complexity, sbar, children }) => (
  <div className="screen-grid" data-sbar={sbar} data-complexity={complexity}>
    {children}
  </div>
)

export class Screen extends React.Component {
  state = {
    showGeneralHelpModal: false,
    showScreenHelpModal: false,
    showButtonModal: false,
    buttonModalContent: { title: '', text: '' },
    showingSBar: this.props.auth.isDemo,
  }

  onKeyDown = event => {
    console.log(event)
    if (event.keyCode === 83 /* S */) {
      this.setState(prevState => ({
        showingSBar: !prevState.showingSBar,
      }))
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false)
    stopSpeech()
  }

  onSwipeLeft = () => {
    this.setState({ showingSBar: false })
  }
  onSwipeRight = () => {
    this.setState({ showingSBar: true })
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
    const state =
      isOn === undefined ? '' : `. It is switched ${isOn ? 'on' : 'off'}`
    const text = helpText ? `${helpText}${state}.` : 'is not described'
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

    const { showingSBar } = this.state

    return (
      <Swipe
        mouseSwipe={true}
        delta={100}
        onSwipedLeft={this.onSwipeLeft}
        onSwipedRight={this.onSwipeRight}
      >
        <ScreenGrid
          complexity={preferences.complexity}
          sbar={showingSBar ? 1 : 0}
        >
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
          {showingSBar ? (
            <SupporterBar {...this.props} helpFn={this.handleButtonHelp} />
          ) : null}
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
        </ScreenGrid>
      </Swipe>
    )
  }
}
/*
const DemoBar = props => <div />

export const Screen = props => {
  const { auth } = props
  if (!auth) {
    console.error('Auth0 is required as a prop')
  }
  return auth.isDemo ? (
    <div className="demo-container">
      <SupporterBar {...props} />
      <UserScreen {...props} />
    </div>
  ) : (
    <UserScreen {...props} />
  )
}
*/
