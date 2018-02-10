import React from 'react'
import { withRouter } from 'react-router-dom'

import auth from '../auth/auth'

function selectAction(actions, action) {
  const noop = () => {}
  const verb = action ? action.verb : 'default'
  const actionsWithDef = { ...actions, default: noop }
  return actionsWithDef[verb] || noop
}

const buttonAction = (action, history) =>
  selectAction(
    {
      route: () => history.push(action.route),
      goback: () => history.goBack(),
    },
    action
  )

const Button = withRouter(
  ({ id, image, label, action, history, staticContext: unused, ...props }) => {
    const actionFn = buttonAction(action, history)
    return (
      <button {...props} type="button" key={id} onClick={actionFn}>
        {image ? <img className="button-image" src={image} alt="" /> : ''}
        {image && label ? <br /> : ''}
        {label ? <span className="button-label">{label}</span> : ''}
      </button>
    )
  }
)

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
