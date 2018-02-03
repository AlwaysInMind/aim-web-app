import React from 'react'
import { Link } from 'react-router-dom'

import withFetchJSON from '../hocs/withFetchJSON'
import withAuth from '../hocs/withAuth'

const Red = ({ children }) => <span style={{ color: 'red' }}>{children}</span>

const Home = ({ auth, error, isLoaded, data }) => {
  return (
    <div>
      {error ? (
        <div>
          Unable to get albums
          {console.log(error.message)}
        </div>
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Red>Welcome {auth.user}</Red>
          <div>
            {data.map(item => (
              <div key={item.id}>
                <Link to={`/photos/${item.id}`}>{item.title}</Link>
              </div>
            ))}
            <div>
              <Link to={`/photos/latest`}>My Latest Photos</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withAuth(withFetchJSON(Home, '/api/albums'))
