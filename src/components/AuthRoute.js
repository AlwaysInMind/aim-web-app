import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import auth from '../auth/auth'

// Always available even in not authed
const PublicRoute = Route

// Route to only if authed else go to '/'
const PrivateRoute = ({ render, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isAuthenticated ? (
        <Redirect to="/login" />
      ) : Component ? (
        <Component />
      ) : (
        render(props)
      )
    }
  />
)

export { PublicRoute, PrivateRoute }
