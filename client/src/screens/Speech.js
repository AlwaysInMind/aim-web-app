import React from 'react'

import { HomeButton, BackButton, SpeakingButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

import './Speech.css'

export const SpeechScreen = ({ data, ...props }) => {
  const { complexity } = preferences

  return (
    <Screen
      screen="speech"
      title="Choose somehting to speak"
      loadingText=""
      errorText=""
      screenHelpText="Press a button to speak the text."
      {...props}
    >
      {helpFn => (
        // closure so can access data prop
        <React.Fragment>
          <SpeakingButton
            className="button-choice"
            image="https://cdn.rawgit.com/straight-street/mulberry-symbols/dc3176f1/EN/svg/hungry.svg"
            label="I'm hungry"
            helpFn={helpFn}
          />
          <SpeakingButton
            className="button-choice"
            image="https://cdn.jamieoliver.com/news-and-features/features/wp-content/uploads/sites/2/2016/04/How_to_make_the_perfect_cup_of_tea_22886_preview.jpg"
            label="Cup of tea please"
            helpFn={helpFn}
          />
          <SpeakingButton
            className="button-choice"
            image="https://cdn.rawgit.com/straight-street/mulberry-symbols/dc3176f1/EN/svg/nurse_2b.svg"
            label="Please get a nurse"
            helpFn={helpFn}
          />
          <SpeakingButton
            className="button-choice"
            image="https://www.gmkfreelogos.com/logos/S/img/Sleepy.gif"
            label="I'm really tired"
            helpFn={helpFn}
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
