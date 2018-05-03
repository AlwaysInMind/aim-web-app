import React from 'react'

const Oops = ({ hint }) => (
  <div className="oops">
    <h1>That's strange</h1>
    <p>
      Something unusual happended so it's best that we go back to the 'home
      screen'.
    </p>
    <p>Don't worry, nothing bad happened and nothing was lost.</p>
    <div className="techy">
      <p>
        The following may help a technical support person to identify what
        happened.
      </p>
      <pre>{hint}</pre>
    </div>
    <button onClick={() => (window.location = '/')}>Carry On</button>
  </div>
)

export class ErrorBoundary extends React.Component {
  state = { hasError: false }

  componentDidCatch(error) {
    this.setState({ hasError: true, error })
  }

  render() {
    const alertUser = this.props.alertUser
    const hasError = this.state.hasError
    const error = this.state.error
    const children = this.props.children

    if (hasError && alertUser) {
      return <Oops hint={error.toString()} />
    } else if (hasError) {
      window.location = '/'
      return null
    } else {
      return children
    }
  }
}
