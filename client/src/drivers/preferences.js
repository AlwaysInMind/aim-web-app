import { callAPI } from './api'
import auth from '../auth/auth'

const _preferences = { slideshowRate: 2000 }

export async function fetchPreferences() {
  const endpoint = '/api/preferences'
  let data
  try {
    data = await callAPI(auth.accessToken, 'GET', endpoint)
    Object.assign(_preferences, data)
  } catch (error) {
    console.log(error) // TODO fix error handling
  }
  localStorage.setItem('preferences', JSON.stringify(_preferences))
}

export async function postPreferences() {
  const prefs = JSON.parse(localStorage.getItem('preferences'))
  if (!prefs) {
    return
  }
  const endpoint = '/api/preferences'
  try {
    await callAPI(auth.accessToken, 'PUT', endpoint, _preferences)
  } catch (error) {
    console.log(error) // TODO fix error handling
  }
}

export const preferences = _preferences

export async function setPreferences(partial) {
  const newPrefs =
    typeof partial === 'function' ? partial(_preferences) : partial
  Object.assign(_preferences, newPrefs)
  postPreferences()
}
