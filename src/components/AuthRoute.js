import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import auth from '../auth/auth'

// Always available even in not authed
const PublicRoute = Route

// Route to only if authed else go to '/'
const PrivateRoute = ({ render, component, ...rest }) => {
  return !auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest} component={component} render={render} />
  )
}

export { PublicRoute, PrivateRoute }
