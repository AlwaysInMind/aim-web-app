import { callAPI } from './api'

// don't mutate, use setPreferences()
export let preferences = {}

export async function getPreferences(accessToken) {
  const endpoint = '/api/preferences'
  let data
  try {
    data = await callAPI(accessToken, 'GET', endpoint)
    preferences = { ...preferences, ...data }
  } catch (error) {
    alert(error)
    console.log(error) // TODO fix error handling
  }
}

export async function setPreferences(accessToken, partial) {
  preferences = { ...preferences, ...partial }
  const endpoint = '/api/preferences'
  try {
    const r = await callAPI(accessToken, 'PUT', endpoint, preferences)
    alert(JSON.stringify(r))
  } catch (error) {
    console.log(error) // TODO fix error handling
  }
}
