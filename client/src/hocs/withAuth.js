import React from 'react'

import { auth } from '../drivers/auth'

// Injects auth prop
export function withAuth(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent auth={auth} {...this.props} />
    }
  }
}
