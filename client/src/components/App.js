import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import Login from '../pages/Login'
import Callback from '../pages/Callback'
import Albums from '../pages/Albums'
import Photos from '../pages/Photos'
import Options from '../pages/Options'
import auth from '../auth/auth'

import './App.css'

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    return auth.handleAuthentication()
  }
  return Promise.reject()
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <PublicRoute path="/login" render={props => <Login />} />
          <PublicRoute
            path={auth.loginCallbackRoute}
            render={props => {
              handleAuthentication(props).then(() => {
                props.history.replace('/')
              })
              return <Callback {...props} />
            }}
          />
          <PrivateRoute exact path="/" render={props => <Albums />} />
          <PrivateRoute
            path="/photos/:id"
            render={({ match: { params: { id } } }) => (
              <Photos fetchURLProps={{ id }} />
            )}
          />
          <PrivateRoute path="/options" render={props => <Options />} />
        </div>
      </Router>
    )
  }
}

export default App
