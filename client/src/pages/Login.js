import React from 'react'

import withAuth from '../hocs/withAuth'

const Login = ({ auth }) => {
  auth.login()
  return <div />
}

export default withAuth(Login)
