import React from 'react'
import { Redirect } from 'react-router-dom'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { isDefaultAlbumName } from '../drivers/preferences'
import { preferences } from '../drivers/preferences'

import './ChooseInfo.css'

const AlbumButton = ({ url, title, thumbnail, ...props }) => (
  <RouterButton
    image={thumbnail}
    label={title}
    route={`/info/${encodeURIComponent(url)}`}
    helpText={`View information pages '${title}'`}
    {...props}
  />
)

const errorText = `Unable to get the info page ${preferences.defaultAlbumName}`

const ChooseInfoScreen = ({ data, ...props }) => {
  const { complexity } = preferences

  return (
    <Screen
      screen="chooseinfo"
      title="Choose Info Page"
      loadingText="Loading your info pages..."
      errorText="Unable to load info pages"
      screenHelpText="Use an info button to view the info."
      {...props}
    >
      {helpFn => (
        // closure so can access data prop
        <React.Fragment>
          <BackButton
            style={{ gridColumn: 'span 2', gridArea: 'back' }}
            className="button-router"
            label="Activities"
            helpFn={helpFn}
            helpText="Choose another Activity"
          />

          {complexity === 0 &&
            data.reduce(
              (acc, item) =>
                isDefaultAlbumName(item.title) ? (
                  <Redirect to={`/info/${encodeURIComponent(item.url)}`} />
                ) : (
                  acc
                ),
              <div className="page-error">{errorText}</div>
            )}
          {complexity > 0 &&
            data.filter(item => !isDefaultAlbumName(item.title)).map(item => (
              <AlbumButton
                className="button-router button-choice"
                url={item.url}
                //thumbnail={item.thumbnail}
                title={item.title}
                key={item.id}
                helpFn={helpFn}
              />
            ))}
        </React.Fragment>
      )}
    </Screen>
  )
}

const wrappedScreen = withAuth(withFetchJSON(ChooseInfoScreen, '/api/info'))
export { wrappedScreen as ChooseInfoScreen }
