import React from 'react'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

//import './Albums.css'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    style={{ gridColumn: 'span 2' }}
    image={thumbnail}
    label={title}
    route={`/photos/${id}`}
    helpText={`View photos in the album '${title}'`}
    {...props}
  />
)

const isDefaultAlbumName = name =>
  name.toLowerCase() === preferences.defaultAlbumName.toLowerCase()

const AlbumsScreen = ({ data, ...props }) => {
  //  const { complexity } = preferences

  return (
    <Screen
      title="Choose Photo Album"
      loadingText="Loading your albums..."
      errorText="Unable to get albums"
      screenHelpText="Press an album button to view the photos."
      {...props}
    >
      {helpFn =>
        // closure so can access data prop
        data
          .filter(item => !isDefaultAlbumName(item.title))
          .map(item => (
            <AlbumButton
              className="button-router"
              id={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              key={item.id}
              helpFn={helpFn}
            />
          ))
      }
    </Screen>
  )
}

const wrappedScreen = withAuth(withFetchJSON(AlbumsScreen, '/api/albums'))
export { wrappedScreen as AlbumsScreen }
