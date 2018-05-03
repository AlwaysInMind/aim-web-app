import React from 'react'
import { Redirect } from 'react-router-dom'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { BackButton, RouterButton } from '../components/Button'
import { Screen } from '../components/Screen'
import { isDefaultAlbumName } from '../drivers/preferences'
import { preferences } from '../drivers/preferences'

import './ChooseVideos.css'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    image={thumbnail}
    label={title}
    route={`/videos/${id}`}
    helpText={`View videos in the playlist '${title}'`}
    {...props}
  />
)

const errorText = `Unable to get the playlist ${preferences.defaultAlbumName}`

const ChooseVideosScreen = ({ data, ...props }) => {
  const { complexity } = preferences

  return (
    <Screen
      screen="videos"
      title="Choose Video Playlist"
      loadingText="Loading your video playlists..."
      errorText="Unable to get video playlists"
      screenHelpText="Press a video playlist button to view the videos."
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
                  <Redirect to={`/videos/${item.id}`} />
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

const wrappedScreen = withAuth(
  withFetchJSON(ChooseVideosScreen, '/api/playlists')
)
export { wrappedScreen as ChooseVideosScreen }
