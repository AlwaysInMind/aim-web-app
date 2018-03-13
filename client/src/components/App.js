import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import { CallbackPage } from '../pages/Callback'
import { HomePage } from '../pages/Home'
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

const Oops = ({ location }) => (
  <div>
    <p>
      Something a little unusual happended and I'm not sure what to show you for
      "{`${location.pathname}${location.search}${location.hash}`}"
    </p>
    <p>
      Please try going back or restarting and do let the AlwaysInMind Team know
      what was happening so we can investigate. Thanks.
    </p>
  </div>
)

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute
            path="/login"
            render={({ location }) => {
              auth.login()
              return null // auth response will route to auth.loginCallbackRoute
            }}
          />

          <PublicRoute
            path={auth.loginCallbackRoute}
            render={props => {
              handleAuthentication(props)
                .then(() => {
                  fetchPreferences(auth.accessToken).then(
                    props.history.replace('/')
                  )
                })
                .catch(error => {
                  console.error(`Problem processing Auth0 redirect ${error}`)
                })
              return <CallbackPage {...props} /> // display untill callback reroutes
            }}
          />
          <PrivateRoute
            exact
            path="/"
            render={() => {
              return <HomePage />
            }}
          />
          <PrivateRoute
            exact
            path="/albums"
            render={() => {
              return <AlbumsPage />
            }}
          />
          <PrivateRoute
            path="/photos/:id"
            render={({ match: { params: { id } } }) => (
              <PhotosPage fetchURLProps={{ id }} />
            )}
          />
          <PrivateRoute
            path="/preferences"
            render={() => <PreferencesPage />}
          />
          <PublicRoute
            render={({ location }) => <Oops location={location} />}
          />
        </Switch>
      </Router>
    )
  }
}
