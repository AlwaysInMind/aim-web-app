import React from 'react'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { RouterButton } from '../components/Button'
import Page from '../components/Page'

const Albums = ({ data, ...props }) => (
  <Page
    title="Choose Photo Album"
    loadingText="Loading your albums..."
    errorText="Unable to get albums"
    {...props}
  >
    {() =>
      data.map(item => (
        <RouterButton
          style={{ gridColumn: 'span 2' }}
          image={item.thumbnail}
          label={item.title}
          route={`/photos/${item.id}`}
          key={item.id}
        />
      ))
    }
  </Page>
)

export default withAuth(withFetchJSON(Albums, '/api/albums'))
