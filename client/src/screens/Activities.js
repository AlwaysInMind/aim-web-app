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
      loadingText="Loading your albums..."
      errorText="Unable to get albums"
      screenHelpText="Press an album button to view the photos."
      {...props}
    >
      {helpFn => (
        // closure so can access data prop
        <React.Fragment>
          <RouterButton
            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
            className="button-router"
            image={''}
            label="View Photos"
            route={`/photos`}
            helpText={`View photos `}
            helpFn={helpFn}
          />
          <RouterButton
            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
            className="button-router"
            image={''}
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
