import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { CallbackScreen } from '../screens/Callback'
import { HomeScreen } from '../screens/Home'
import { ActivitiesScreen } from '../screens/Activities'
import { ChoosePhotosScreen } from '../screens/ChoosePhotos'
import { ChooseVideosScreen } from '../screens/ChooseVideos'
import { ChooseInfoScreen } from '../screens/ChooseInfo'
import { PhotosScreen } from '../screens/Photos'
import { VideosScreen } from '../screens/Videos'
import { InfoScreen } from '../screens/Info'
import { MessageScreen } from '../screens/Message'
import { PreferencesScreen } from '../screens/Preferences'
import { auth } from '../drivers/auth'
import { fetchPreferences, preferences } from '../drivers/preferences'

import './App.css'
import './Theme.css'

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    return auth.handleAuthentication()
  }
  return Promise.reject()
}

export class App extends React.Component {
  render() {
    const alertUser = preferences && preferences.complexity >= 2

    return (
      <Router>
        <ErrorBoundary alertUser={alertUser}>
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
                    fetchPreferences().then(props.history.replace('/'))
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
              path="/activities"
              render={() => {
                return <ActivitiesScreen />
              }}
            />
            <PrivateRoute
              exact
              path="/photos"
              render={() => {
                return <ChoosePhotosScreen />
              }}
            />
            <PrivateRoute
              exact
              path="/videos"
              render={() => {
                return <ChooseVideosScreen />
              }}
            />
            <PrivateRoute
              exact
              path="/info"
              render={() => {
                return <ChooseInfoScreen />
              }}
            />
            <PrivateRoute
              exact
              path="/message"
              render={() => {
                return <MessageScreen />
              }}
            />
            <PrivateRoute
              path="/photos/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <PhotosScreen fetchURLProps={{ id }} />}
            />
            <PrivateRoute
              path="/videos/:id"
              render={({
                match: {
                  params: { id },
                },
              }) => <VideosScreen playlistId={id} />}
            />
            <PrivateRoute
              path="/info/:url"
              render={({
                match: {
                  params: { url },
                },
              }) => (
                <InfoScreen
                  url={decodeURIComponent(url)}
                  fetchURLProps={{ url }}
                />
              )}
            />
            <PrivateRoute
              path="/preferences"
              render={() => <PreferencesScreen />}
            />
            <PublicRoute
              render={({ location }) => {
                throw new Error(
                  `Unknown route: ${location.pathname}${location.search}${
                    location.hash
                  }`
                )
              }}
            />
          </Switch>
        </ErrorBoundary>
      </Router>
    )
  }
}
