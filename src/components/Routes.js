import React from 'react'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import Login from './Login'
import Home from './Home'

const Routes = () => {
  return (
    <div>
      <PublicRoute exact path="/" component={Login} />
      <PrivateRoute path="/home" component={Home} />
    </div>
  )
}

export default Routes
