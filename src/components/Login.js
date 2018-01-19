import React from 'react'
import { Link } from 'react-router-dom'

import withAuth from '../hocs/withAuth'

const Login = ({ auth }) => {
  return (
    <div>
      <Link to="/home">Please Login </Link>
    </div>
  )
}

export default withAuth(Login)
