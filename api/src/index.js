const { json, send, createError } = require('micro')
const { router, get, put, options } = require('microrouter')

const cors = require('./cors')()
const {
  withAuth0,
  getUserMetadata,
  setUserMetadata,
} = require('./providers/auth0')
const { withProviderGet } = require('./providers')

const handleGetAlbums = withProviderGet('getAlbums', async (fn, params) => {
  const albums = await fn()
  return albums
})

const handleGetPhotos = withProviderGet('getPhotos', async (fn, params) => {
  const albumId = params.id
  const photos = await fn(albumId)
  return photos
})

const handleGetPreferences = withAuth0(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
  } // Get a token to access the admin API
  let preferences
  try {
    preferences = await getUserMetadata(req.user.sub)
  } catch (err) {
    throw createError(400, err.message, err)
  }
  res.setHeader('Content-Type', 'application/json')
  send(res, 200, preferences)
})

const handleSetPreferences = withAuth0(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
  } // Get a token to access the admin API
  let metadata
  try {
    const preferences = await json(req)
    metadata = await setUserMetadata(req.user.sub, preferences)
  } catch (err) {
    console.log(err)
    throw createError(400, err.message, err)
  }
  res.setHeader('Content-Type', 'application/json')
  send(res, 200, metadata)
})

const notFound = (req, res) => send(res, 404, 'Unknown route')

module.exports = cors(
  router(
    //    get('/api/photos/recent', handleGetRecentPhotos),
    get('/api/albums', handleGetAlbums),
    get('/api/albums/:id', handleGetPhotos),
    get('/api/preferences', handleGetPreferences),
    put('/api/preferences', handleSetPreferences),
    get('/*', notFound),
    options('/*', (req, res) => send(res, 200, '')) // any CORS preflight accepted
  )
)
