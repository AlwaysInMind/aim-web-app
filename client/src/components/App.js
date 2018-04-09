import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import { CallbackScreen } from '../screens/Callback'
import { HomeScreen } from '../screens/Home'
import { AlbumsScreen } from '../screens/Albums'
import { PhotosScreen } from '../screens/Photos'
import { PreferencesScreen } from '../screens/Preferences'
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
              return <CallbackScreen {...props} /> // display untill callback reroutes
            }}
          />
          <PrivateRoute
            exact
            path="/"
            render={() => {
              return <HomeScreen />
            }}
          />
          <PrivateRoute
            exact
            path="/albums"
            render={() => {
              return <AlbumsScreen />
            }}
          />
          <PrivateRoute
            path="/photos/:id"
            render={({ match: { params: { id } } }) => (
              <PhotosScreen fetchURLProps={{ id }} />
            )}
          />
          <PrivateRoute
            path="/preferences"
            render={() => <PreferencesScreen />}
          />
          <PublicRoute
            render={({ location }) => <Oops location={location} />}
          />
        </Switch>
      </Router>
    )
  }
}
