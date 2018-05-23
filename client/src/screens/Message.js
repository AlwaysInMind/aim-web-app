import React from 'react'

import { withFetchJSON, pathTemplate } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { HomeButton, BackButton } from '../components/Button.js'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

import './Message.css'

const Message = ({ complexity, subject, body }) => {
  return (
    <div className="message">
      {subject}
      <br />
      {body}
    </div>
  )
}

class MessageScreen extends React.Component {
  render() {
    const { data, ...props } = this.props
    const { complexity } = preferences
    console.log(data)
    return (
      <Screen
        screen="message"
        title="View Message"
        loadingText="Loading your message..."
        errorText="Unable to get message"
        screenHelpText="View the message. Use the Down and Up buttons to see more "
        {...props}
      >
        {helpFn => (
          <React.Fragment>
            <Message
              complexity={complexity}
              subject={data[0].subject}
              body={data[0].body}
            />

            {complexity === 0 && (
              <HomeButton
                style={{ gridArea: 'home' }}
                className="button-router"
                label="More..."
                helpFn={helpFn}
                helpText="Choose more things to do"
              />
            )}
            {complexity > 0 && (
              <BackButton
                style={{ gridArea: 'back' }}
                className="button-router"
                label="Activities"
                helpFn={helpFn}
                helpText="Choose another thing to do"
              />
            )}
          </React.Fragment>
        )}
      </Screen>
    )
  }
}

const wrappedScreen = withAuth(
  withFetchJSON(MessageScreen, pathTemplate`/api/message`)
)
export { wrappedScreen as MessageScreen }
