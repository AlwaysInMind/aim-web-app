import React from 'react'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'

const Red = ({ children }) => <span style={{ color: 'red' }}>{children}</span>

const Home = ({ auth, error, isLoaded, data }) => {
  return (
    <div>
      {error ? (
        <div>
          Unable to get users.
          {console.log(error.message)}
        </div>
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Red>Welcome {auth.user}</Red>
          <div>{data.map(item => <div>{item.name}</div>)}</div>
        </div>
      )}
    </div>
  )
}

export default withAuth(withFetchJSON(Home, '/api/users'))
