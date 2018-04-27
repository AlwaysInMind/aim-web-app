import React from 'react'

import { Header } from './Header'
import { SupporterBar } from './SupporterBar'
import { HelpModal } from './HelpModal'
import { Swipe } from './Swipe'

import './Screen.css'
import './Button.css'

import { setPreferences, preferences, stopSpeech } from '../drivers/preferences'

const generalHelpContent = {
  title: 'Using Always In Mind',
  text: `Press the buttons to make things happen.
The text, pictures and button colour show what will happen.
Some buttons show a new screen so you can do something new.
Press a button for more than 1 second to learn what it does.
But don't worry, just try a button and nothing bad will happen.
`,
}

const barHelpTitle = `The column on the left is the Setup bar`
const barHelpText = `Use the buttons to change the features and operation of the user screen.
 You can hide or show the bar at any time. Swipe left to hide the bar, swipe right to show it. Or use the 's' key on the keyboard to show and hide the bar.`

const GeneralHelpModal = ({ title, text, open, speak, closeFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    speak={speak}
    closeFn={closeFn}
    small="false"
    {...props}
  />
)

const ScreenHelpModal = ({
  title,
  text,
  open,
  speak,
  closeFn,
  moreFn,
  ...props
}) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    speak={speak}
    closeFn={closeFn}
    small="false"
    moreFn={moreFn}
    {...props}
  />
)

const ButtonHelpModal = ({ title, text, open, speak, closeFn, ...props }) => (
  <HelpModal
    title={title}
    text={text}
    open={open}
    speak={speak}
    closeFn={closeFn}
    small="true"
  />
)

const ScreenGrid = ({ screen, complexity, sbar, children }) => (
  <div
    className="screen-grid"
    data-screen={screen}
    data-sbar={sbar}
    data-complexity={complexity}
  >
    {children}
  </div>
)

export class Screen extends React.Component {
  state = {
    showGeneralHelpModal: false,
    showScreenHelpModal: false,
    screenModalContent: { title: '', text: '' },
    showButtonModal: false,
    buttonModalContent: { title: '', text: '' },
    showingSBar: preferences.showSBar,
  }

  onKeyDown = event => {
    if (event.keyCode === 83 /* S */) {
      this.setState(prevState => {
        const showSBar = !prevState.showingSBar
        setPreferences({
          showSBar,
        })
        return {
          showingSBar: showSBar,
        }
      })
    }
  }

  onSwipeLeft = () => {
    this.setState({ showingSBar: false })
    setPreferences({
      showSBar: false,
    })
  }

  onSwipeRight = () => {
    this.setState({ showingSBar: true })
    setPreferences({
      showSBar: true,
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false)
    stopSpeech()
  }

  screenHelpModalTitle() {
    return
  }
  screenHelpModalText() {
    return `This Screen is: ${this.props.title}`
  }

  handleScreenHelp = () => {
    if (preferences.showHelp || preferences.speakHelp) {
      this.setState({
        showScreenHelpModal: true,
        screenModalContent: {
          title: `This Screen is: ${this.props.title}`,
          text: this.props.screenHelpText,
        },
      })
    }
  }

  handleBarHelp = () => {
    if (preferences.showHelp || preferences.speakHelp) {
      this.setState({
        showScreenHelpModal: true,
        screenModalContent: { title: barHelpTitle, text: barHelpText },
      })
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
    if (preferences.showHelp || preferences.speakHelp) {
      stopSpeech()
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
    if (preferences.showHelp || preferences.speakHelp) {
      this.setState({
        showButtonModal: true,
        buttonModalContent: { title, text },
      })
    }
  }

  render() {
    const {
      screen,
      error,
      isLoaded,
      title,
      loadingText,
      errorText,
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
          screen={screen}
          complexity={preferences.complexity}
          sbar={showingSBar ? 1 : 0}
        >
          <GeneralHelpModal
            title={generalHelpContent.title}
            text={generalHelpContent.text}
            open={this.state.showGeneralHelpModal}
            speak={preferences.speakHelp}
            closeFn={this.handleCloseModals}
            helpFn={this.handleButtonHelp}
          />
          <ScreenHelpModal
            title={this.state.screenModalContent.title}
            text={this.state.screenModalContent.text}
            open={this.state.showScreenHelpModal}
            speak={preferences.speakHelp}
            closeFn={this.handleCloseModals}
            helpFn={this.handleButtonHelp}
            moreFn={this.handleMoreHelp}
          />
          <ButtonHelpModal
            title={this.state.buttonModalContent.title}
            text={this.state.buttonModalContent.text}
            open={this.state.showButtonModal}
            speak={preferences.speakHelp}
            closeFn={this.handleCloseModals}
            helpFn={this.handleButtonHelp}
          />
          {showingSBar ? (
            <SupporterBar
              {...this.props}
              helpFn={this.handleButtonHelp}
              handleBarHelp={this.handleBarHelp}
            />
          ) : (
            <div className="screen-sbar-blank " />
          )}
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
