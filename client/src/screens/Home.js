import React from 'react'
import { Redirect } from 'react-router-dom'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { Screen } from '../components/Screen'
import { preferences } from '../drivers/preferences'

const errorText = `Unable to get the Album ${preferences.defaultAlbumName}`

const DefaultAlbumScreen = ({ data, ...props }) => (
  <Screen
    title="Getting your photo albums"
    loadingText="Loading your albums..."
    errorText={errorText}
    screenHelpText="Press an album button to view the photos."
    {...props}
  >
    {helpFn => {
      // closure so can access data prop
      const defaultAlbum = data
        .filter(item => (item.title = 'Always In Mind'))
        .map(item => <Redirect to={`/photos/${item.id}`} />)
      if (!defaultAlbum.length) {
        return <div className="page-error">{errorText}</div>
      }
      return defaultAlbum[0]
    }}
  </Screen>
)

const WrappedDefaultAlbumScreen = withAuth(
  withFetchJSON(DefaultAlbumScreen, '/api/albums')
)

export const HomeScreen = () => {
  const { complexity } = preferences

  if (complexity === 0) {
    return <WrappedDefaultAlbumScreen />
  }

  return <Redirect to="/albums" />
}
