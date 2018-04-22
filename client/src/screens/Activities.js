import React from 'react'

import { RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'

import './Activities.css'

export const ActivitiesScreen = ({ data, ...props }) => {
  //  const { complexity } = preferences

  return (
    <Screen
      screen="activities"
      title="Choose an Activity to do"
      loadingText=""
      errorText=""
      screenHelpText="Press a button to do the activity."
      {...props}
    >
      {helpFn => (
        // closure so can access data prop
        <React.Fragment>
          <RouterButton
            className="button-router button-choice"
            svg={'picture.svg'}
            label="View Photos"
            route={`/photos`}
            helpText={`View photos `}
            helpFn={helpFn}
          />
          <RouterButton
            className="button-router button-choice"
            svg={'film.svg'}
            label="Watch Videos"
            route={`/videos`}
            helpText={`View videos `}
            helpFn={helpFn}
          />
        </React.Fragment>
      )}
    </Screen>
  )
}
