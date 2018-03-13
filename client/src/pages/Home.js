import React from 'react'
import { Redirect } from 'react-router-dom'

import { preferences, DEFAULT_ITEM_ID } from '../drivers/preferences'

export const HomePage = () => {
  const { complexity } = preferences

  return complexity === 0 ? (
    <Redirect to={`/photos/${DEFAULT_ITEM_ID}`} />
  ) : complexity === 1 ? (
    <Redirect to="/albums" />
  ) : complexity === 2 ? (
    <Redirect to="/albums" />
  ) : null
}
