import React from 'react'

import withAuth from '../hocs/withAuth'

const Red = ({ children }) => <span style={{ color: 'red' }}>{children}</span>

const Home = ({ auth }) => {
  return (
    <div>
      {!auth.isAuthenticated && <p>This should never be visible!!!</p>}
      <Red>Welcome {auth.user}!!</Red>
    </div>
  )
}

export default withAuth(Home)
