import { callAPI } from './api'
import { auth } from '../drivers/auth'
import { speak, cancelSpeech } from '../drivers/speech'

const defaults = {
  slideShowRate: 4000,
  speakHelp: true,
  showHelp: false,
  complexity: 0,
}

export const preferences = new Proxy(
  {},
  {
    get: function(obj, prop) {
      const prefs = JSON.parse(localStorage.getItem('preferences') || '{}')
      return prop in prefs ? prefs[prop] : defaults[prop]
    },
    set: function(obj, prop, value) {
      console.error('Preferences are immutable, use setState()')
      return false
    },
  }
)

export function setPreferences(partial) {
  const prefs = JSON.parse(localStorage.getItem('preferences') || '{}')
  const newPrefs = typeof partial === 'function' ? partial(prefs) : partial
  Object.assign(prefs, newPrefs)
  localStorage.setItem('preferences', JSON.stringify(prefs))
  if (!auth.isDemo) {
    postPreferences()
  }
}

export async function fetchPreferences() {
  const endpoint = '/api/preferences'
  let prefs
  try {
    prefs = await callAPI(auth.accessToken, 'GET', endpoint)
  } catch (error) {
    console.log(error) // TODO fix error handling
  }
  localStorage.setItem('preferences', JSON.stringify(prefs || {}))
}

export async function postPreferences() {
  const endpoint = '/api/preferences'
  const prefs = JSON.parse(localStorage.getItem('preferences')) || {}
  try {
    await callAPI(auth.accessToken, 'PUT', endpoint, prefs)
  } catch (error) {
    console.log(error) // TODO fix error handling
  }
}

export function optionallySpeak(what) {
  if (preferences.speakHelp) {
    speak(what + '.')
  }
}

export function stopSpeech() {
  if (preferences.speakHelp) {
    cancelSpeech()
  }
}
