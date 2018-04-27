const { send, createError } = require('micro')
const read = require('node-readability')

const promisify = require('../promisify')

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
    ['demo', demoProvider],
    ['google-oauth2', googleProvider],
  ])
  return map.get(name)
}

function providerFunction(providerName, fnName) {
  console.info(providerName, fnName)
  return provider(providerName)[fnName]
}

const callProvider = async (fnName, req, res, wrapped) => {
  let obj
  try {
    // Get a token to access the admin API
    const { accessToken, userId: auth0UserId } = await getIdPIdent(req.user.sub)
    const [provName, userId] = auth0UserId.split('|')
    const providerName = provName === 'auth0' ? 'demo' : provName
    const fn = async (...args) =>
      providerFunction(providerName, fnName)(accessToken, userId, ...args)
    obj = await wrapped(fn, req, res)
  } catch (err) {
    throw createError(400, err.message, err)
  }
  return obj
}

exports.callProvider = callProvider

exports.handleProvider = (fnName, wrapped) => {
  return withAuth0(async (req, res) => {
    if (!req.user) {
      send(res, 400, 'Problem with Authorization token')
      return
    }
    let obj
    try {
      obj = await callProvider(fnName, req, res, wrapped)
    } catch (err) {
      send(res, err.statusCode, err.message)
      return
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    send(res, 200, obj)
  })
}

exports.handlePreferences = (action, wrapped) => {
  return withAuth0(async (req, res) => {
    if (!req.user) {
      send(res, 400, 'Problem with Authorization token')
      return
    } // Get a token to access the admin API
    let preferences
    try {
      const prefsFunction = action === 'set' ? setUserMetadata : getUserMetadata
      const fn = async prefs => prefsFunction(req.user.sub, prefs)
      preferences = await wrapped(fn, req, res)
    } catch (err) {
      send(res, err.statusCode || 0, err.message)
      return
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    send(res, 200, preferences)
  })
}

const { request } = require('./request-object')

exports.handleReadable = wrapped => {
  return withAuth0(async (req, res) => {
    if (!req.user) {
      send(res, 400, 'Problem with Authorization token')
      return
    }
    let readable
    try {
      const readify = promisify(read)
      const fn = async url => {
        const urld = decodeURIComponent(url)
        const page = await request({
          method: 'GET',
          url: urld,
        })
        const iframeCompat = page.headers['x-frame-options'] === undefined
        const article = await readify(page.body)
        const res = {
          title: article.title,
          content: article.content,
          iframeCompat,
        }
        article.close()
        return res
      }
      readable = await wrapped(fn, req, res)
    } catch (err) {
      send(res, err.statusCode || 0, err.message)
      return
    }
    // NB the source content may NOT be utf-8.
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    send(res, 200, readable)
  })
}
