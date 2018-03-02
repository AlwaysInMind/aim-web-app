const { json, send } = require('micro')
const { router, get, put, options } = require('microrouter')

const cors = require('./cors')()
const { handleProvider, handlePreferences } = require('./providers')

const handleGetAlbums = handleProvider('getAlbums', async (fn, params) => {
  const albums = await fn()
  return albums
})

const handleGetPhotos = handleProvider('getPhotos', async (fn, params) => {
  const albumId = params.id
  const photos = await fn(albumId)
  return photos
})

const handleGetPreferences = handlePreferences(
  'get',
  async (fnPrefs, req, res) => {
    const preferences = await fnPrefs()
    return preferences
  }
)

const handleSetPreferences = handlePreferences(
  'set',
  async (fnPrefs, req, res) => {
    const preferences = await json(req)
    const preferences2 = await fnPrefs(preferences)
    return preferences2
  }
)

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
