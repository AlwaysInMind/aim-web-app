import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './AuthRoute'
import Home from './Home'
import Login from './Login'
import Callback from './Callback'
import auth from '../auth/auth'

import './App.css'

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    return auth.handleAuthentication()
  } else return new Promise.reject()
}

const AuthButton = ({ onAuthChanged }) => {
  return (
    <button
      onClick={() => {
        const ia = auth.isAuthenticated
        ;(ia ? auth.logout : auth.login)()
        onAuthChanged(ia) // potential race condidition
      }}
    >
      {auth.isAuthenticated ? `Logout` : 'Login'}
    </button>
  )
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Always in Mind</h1>
            <AuthButton
              onAuthChanged={() => {
                this.forceUpdate()
              }}
            />
          </header>

          <PrivateRoute exact path="/" render={props => <Home />} />
          <PublicRoute path="/login" render={props => <Login />} />
          <PublicRoute
            path={auth.callbackPath}
            render={props => {
              if (/access_token|id_token|error/.test(props.location.hash)) {
                handleAuthentication(props).then(() => {
                  props.history.replace('/')
                })
              }
              return <Callback {...props} />
            }}
          />
        </div>
      </Router>
    )
  }
}

export default App
