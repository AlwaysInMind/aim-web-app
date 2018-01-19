import React from 'react'

import auth from '../auth/auth'

// Injects auth prop
function withAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent auth={auth} {...this.props} />
    }
  }
}

export default withAuth
