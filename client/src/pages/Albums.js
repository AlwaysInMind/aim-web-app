import React from 'react'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'
import { Button, AuthButton } from '../components/Button.js'

const Albums = ({ auth, error, isLoaded, data }) => {
  return (
    <React.Fragment>
      <Button className="header-main" label="View photos" />
      <AuthButton className="header-log" />
      {error ? (
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
            action={{ verb: 'route', route: `/photos/${item.id}` }}
            key={item.id}
          />
        ))
      )}
    </React.Fragment>
  )
}

export default withAuth(withFetchJSON(Albums, '/api/albums'))