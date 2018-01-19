import React from 'react'
import { withRouter } from 'react-router-dom'

import Routes from './Routes'
import withAuth from '../hocs/withAuth'

import './App.css'

const App = props => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Always in Mind</h1>
    </header>
    <Routes {...props} />
  </div>
)

export default withRouter(withAuth(App))
