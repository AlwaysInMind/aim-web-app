import React from 'react'
import { Redirect } from 'react-router-dom'

import { withFetchJSON } from '../hocs/withFetchJSON'
import { withAuth } from '../hocs/withAuth'
import { Page } from '../components/Page'
import { preferences } from '../drivers/preferences'

const errorText = `Unable to get the Album ${preferences.defaultAlbumName}`

const DefaultAlbumPage = ({ data, ...props }) => (
  <Page
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
  </Page>
)

const WrappedDefaultAlbumPage = withAuth(
  withFetchJSON(DefaultAlbumPage, '/api/albums')
)

export const HomePage = () => {
  const { complexity } = preferences

  if (complexity === 0) {
    return <WrappedDefaultAlbumPage />
  }

  return <Redirect to="/albums" />
}
