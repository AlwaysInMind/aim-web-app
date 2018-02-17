import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import { CallbackPage } from '../pages/Callback'
import { AlbumsPage } from '../pages/Albums'
import { PhotosPage } from '../pages/Photos'
import { PreferencesPage } from '../pages/Preferences'
import { auth } from '../drivers/auth'
import { fetchPreferences } from '../drivers/preferences'

import './App.css'

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    return auth.handleAuthentication()
  }
  return Promise.reject()
}

export class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <PublicRoute
            path="/login"
            render={() => {
              auth.login()
              return null
            }}
          />
          <PublicRoute
            path={auth.loginCallbackRoute}
            render={props => {
              handleAuthentication(props).then(() => {
                fetchPreferences(auth.accessToken)
                props.history.replace('/')
              })
              return <CallbackPage {...props} />
            }}
          />
          <PrivateRoute exact path="/" render={props => <AlbumsPage />} />
          <PrivateRoute
            path="/photos/:id"
            render={({ match: { params: { id } } }) => (
              <PhotosPage fetchURLProps={{ id }} />
            )}
          />
          <PrivateRoute
            path="/preferences"
            render={props => <PreferencesPage />}
          />
        </React.Fragment>
      </Router>
    )
  }
}
