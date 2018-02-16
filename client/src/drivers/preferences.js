import { callAPI } from './api'

let _preferences

const defaults = { slideshowRate: 2000 }

export default {
  get preferences() {
    return _preferences
  },

  async fetchPreferences(accessToken) {
    const endpoint = '/api/preferences'
    let data
    try {
      data = await callAPI(accessToken, 'GET', endpoint)
      _preferences = { ..._preferences, ...data, ...defaults }
    } catch (error) {
      alert(error)
      console.log(error) // TODO fix error handling
    }
  },

  async putPreferences(accessToken, partial) {
    _preferences = { ..._preferences, ...partial }
    const endpoint = '/api/preferences'
    try {
      const r = await callAPI(accessToken, 'PUT', endpoint, _preferences)
      alert(JSON.stringify(r))
    } catch (error) {
      console.log(error) // TODO fix error handling
    }
  },
}
