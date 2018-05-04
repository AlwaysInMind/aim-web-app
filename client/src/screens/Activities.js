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
            label="Photos"
            route={`/photos`}
            helpText={`Look at photos`}
            helpFn={helpFn}
          />
          <RouterButton
            className="button-router button-choice"
            svg={'film.svg'}
            label="Videos / Music"
            route={`/videos`}
            helpText={`Watch videos and listen to music`}
            helpFn={helpFn}
          />
          <RouterButton
            className="button-router button-choice"
            svg={'info.svg'}
            label="Information"
            route={`/info`}
            helpText={`Read pages of information`}
            helpFn={helpFn}
          />
        </React.Fragment>
      )}
    </Screen>
  )
}
