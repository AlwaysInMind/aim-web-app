import React from 'react'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { RouterButton } from '../components/Button'
import Page from '../components/Page'

const AlbumButton = ({ id, title, thumbnail, ...props }) => (
  <RouterButton
    style={{ gridColumn: 'span 2' }}
    image={thumbnail}
    label={title}
    route={`/photos/${id}`}
    helpText={`View photos in the album '${title}'`}
  />
)

const Albums = ({ data, ...props }) => (
  <Page
    title="Choose Photo Album"
    loadingText="Loading your albums..."
    errorText="Unable to get albums"
    pageHelpText="You can view the photos in an album pressing the button for the one you'd like to see."
    {...props}
  >
    {() =>
      // closure so can access data prop
      data.map(item => (
        <AlbumButton
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          key={item.id}
        />
      ))
    }
  </Page>
)

export default withAuth(withFetchJSON(Albums, '/api/albums'))
