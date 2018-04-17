import React from 'react'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { isDefaultAlbumName } from '../drivers/preferences'

import './Playlists.css'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    style={{ gridColumn: 'span 2', gridRow: 'span 2', fontSize: '70%' }}
    image={thumbnail}
    label={title}
    route={`/videos/${id}`}
    helpText={`View videos in the playlist '${title}'`}
    {...props}
  />
)

const PlaylistsScreen = ({ data, ...props }) => {
  //  const { complexity } = preferences

  return (
    <Screen
      screen="playlists"
      title="Choose Video Playlist"
      loadingText="Loading your playlists..."
      errorText="Unable to get playlists"
      screenHelpText="Press an playlists button to view the videos."
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

          {data
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
            ))}
        </React.Fragment>
      )}
    </Screen>
  )
}

const wrappedScreen = withAuth(withFetchJSON(PlaylistsScreen, '/api/playlists'))
export { wrappedScreen as PlaylistsScreen }
