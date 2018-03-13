const { json, send } = require('micro')
const { router, get, put, options } = require('microrouter')

const cors = require('./cors')()
const {
  handleProvider,
  callProvider,
  handlePreferences,
} = require('./providers')

const DEFAULT_ITEM_ID = '~default~'

const handleGetAlbums = handleProvider('getAlbums', async (fn, req) => {
  const albums = await fn()
  return albums
})

const handleGetPhotos = handleProvider('getPhotos', async (fn, req, res) => {
  let albumId = req.params.id
  if (albumId === DEFAULT_ITEM_ID) {
    const defaultAlbum = await callProvider(
      'getDefaultAlbum',
      req,
      res,
      async (fn, req) => {
        return fn()
      }
    )
    console.log(defaultAlbum)
    albumId = defaultAlbum.id
  }
  const photos = await fn(albumId)
  console.log(photos)
  return photos
})

const handleGetPreferences = handlePreferences('get', async fnPrefs => {
  const preferences = await fnPrefs()
  return preferences
})

const handleSetPreferences = handlePreferences('set', async (fnPrefs, req) => {
  const preferences = await json(req)
  const preferences2 = await fnPrefs(preferences)
  return preferences2
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
