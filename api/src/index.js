const { json, send, createError } = require('micro')
const { router, get, put, options } = require('microrouter')

const cors = require('./cors')()
const {
  withAuth0,
  getIdPIdent,
  getUserMetadata,
  setUserMetadata,
} = require('./auth/auth0')
const {
  getAlbums: googleGetAlbums,
  getPhotos: googleGetPhotos,
} = require('./providers/google/photos.js')

const handleGetAlbums = withAuth0(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
  } // Get a token to access the admin API
  let titles
  try {
    const { accessToken: googleAccessToken } = await getIdPIdent(req.user.sub)
    titles = await googleGetAlbums(googleAccessToken)
  } catch (err) {
    throw createError(400, err.message, err)
  }

  res.setHeader('Content-Type', 'application/json')
  send(res, 200, titles)
})

const handleGetPhotos = withAuth0(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token')
  } // Get a token to access the admin API
  let photos
  try {
    const albumId = req.params.id
    const {
      accessToken: googleAccessToken,
      userId: googleUserId,
    } = await getIdPIdent(req.user.sub)
    photos = await googleGetPhotos(googleAccessToken, googleUserId, albumId)
  } catch (err) {
    throw createError(400, err.message, err) // TODO fix this
  }

  res.setHeader('Content-Type', 'application/json')
  send(res, 200, photos)
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
