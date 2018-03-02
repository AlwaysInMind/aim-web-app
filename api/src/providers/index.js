const { send, createError } = require('micro')

const { withAuth0 } = require('./auth0')
const {
  getIdPIdent,
  getUserMetadata,
  setUserMetadata,
} = require('./auth0/management')
const { googleProvider } = require('./google')
const { demoProvider } = require('./demo')

function provider(name) {
  const map = new Map([
    ['auth0', demoProvider],
    ['google-oauth2', googleProvider],
  ])
  return map.get(name)
}

function providerFunction(providerName, fnName) {
  return provider(providerName)[fnName]
}

exports.handleProvider = (fnName, wrapped) => {
  return withAuth0(async (req, res) => {
    if (!req.user) {
      throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
    } // Get a token to access the admin API
    let obj
    try {
      const { accessToken, userId: auth0UserId } = await getIdPIdent(
        req.user.sub
      )
      const [providerName, userId] = auth0UserId.split('|')
      const fn = async (...args) =>
        providerFunction(providerName, fnName)(accessToken, userId, ...args)
      obj = await wrapped(fn, req.params)
    } catch (err) {
      throw createError(400, err.message, err)
    }

    res.setHeader('Content-Type', 'application/json')
    send(res, 200, obj)
  })
}

exports.handlePreferences = (action, wrapped) => {
  return withAuth0(async (req, res) => {
    if (!req.user) {
      throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
    } // Get a token to access the admin API
    let preferences
    try {
      const prefsFunction = action === 'set' ? setUserMetadata : getUserMetadata
      const fn = async prefs => prefsFunction(req.user.sub, prefs)
      preferences = await wrapped(fn, req, res)
    } catch (err) {
      throw createError(400, err.message, err)
    }
    res.setHeader('Content-Type', 'application/json')
    send(res, 200, preferences)
  })
}
