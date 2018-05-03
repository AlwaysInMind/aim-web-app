import React from 'react'
import { Redirect } from 'react-router-dom'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { isDefaultAlbumName } from '../drivers/preferences'
import { preferences } from '../drivers/preferences'

import './ChoosePhotos.css'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    image={thumbnail}
    label={title}
    route={`/photos/${id}`}
    helpText={`View photos in the album '${title}'`}
    {...props}
  />
)

const errorText = `Unable to get the Album ${preferences.defaultAlbumName}`

const ChoosePhotosScreen = ({ data, ...props }) => {
  const { complexity } = preferences

  return (
    <Screen
      screen="choosephotos"
      title="Choose Photo Album"
      loadingText="Loading your photo albums..."
      errorText="Unable to get photo albums"
      screenHelpText="Press a photo album button to view the photos."
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
                  <Redirect to={`/photos/${item.id}`} />
                ) : (
                  acc
                ),
              <div className="page-error">{errorText}</div>
            )}
          {complexity > 0 &&
            data
              .filter(item => !isDefaultAlbumName(item.title))
              .map(item => (
                <AlbumButton
                  className="button-router button-choice"
                  id={item.id}
                  thumbnail={item.thumbnail}
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

const wrappedScreen = withAuth(withFetchJSON(ChoosePhotosScreen, '/api/albums'))
export { wrappedScreen as ChoosePhotosScreen }
