import React from 'react'
import { withRouter } from 'react-router-dom'

import auth from '../auth/auth'

const Button = withRouter(({ id, image, label, action, history, ...props }) => {
  const actionFn =
    action && action.verb === 'route'
      ? () => history.push(action.route)
      : action && action.verb === 'goback' ? () => history.goBack() : () => {}
  return (
    <button {...props} type="button" key={id} onClick={actionFn}>
      {image ? <img className="button-image" src={image} alt="" /> : ''}
      {image && label ? <br /> : ''}
      {label ? <span className="button-label">{label}</span> : ''}
    </button>
  )
})

const AuthButton = ({ onAuthChanged, ...props }) => {
  return (
    <button
      {...props}
      onClick={() => {
        const authed = auth.isAuthenticated
        ;(authed ? auth.logout : auth.login)()
      }}
    >
      {auth.isAuthenticated ? `Logout` : 'Login'}
    </button>
  )
}

export { Button, AuthButton }
