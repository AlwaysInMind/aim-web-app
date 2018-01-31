import React from 'react'

import withFetchJSON, { template } from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'

const Photos = ({ auth, error, isLoaded, data }) => {
  return (
    <div>
      {error ? (
        <div>
          Unable to get photos
          {console.log(error.message)}
        </div>
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            {data.map(item => (
              <img src={item.src} key={item.id} alt="Wibble" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default withAuth(withFetchJSON(Photos, template`/api/albums/${'id'}`))
