import React from 'react'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { Button } from '../components/Button'

const Home = ({ auth, error, isLoaded, data }) => {
  return error ? (
    <div className="page-error">
      Unable to get albums
      {console.log(error.message)}
    </div>
  ) : !isLoaded ? (
    <div className="page-loading">Loading your albums...</div>
  ) : (
    data.map(item => (
      <Button
        image={item.thumbnail}
        label={item.title}
        action={`/photos/${item.id}`}
        key={item.id}
      />
    ))
  )
}

export default withAuth(withFetchJSON(Home, '/api/albums'))
