const { json, send } = require('micro')
const { router, get, put, options } = require('microrouter')

const cors = require('./cors')()
const {
  handleProvider,
  handlePreferences,
  handleReadable,
} = require('./providers')

const handleGetAlbums = handleProvider('getAlbums', async (fn, req) => {
  const albums = await fn()
  return albums
})

const handleGetPhotos = handleProvider('getPhotos', async (fn, req, res) => {
  let albumId = req.params.id
  const photos = await fn(albumId)
  return photos
})

const handleGetPlaylists = handleProvider('getPlaylists', async (fn, req) => {
  const playlists = await fn()
  return playlists
})

const handleGetInfo = handleProvider('getInfo', async (fn, req) => {
  const info = await fn()
  return info
})

const handleGetMessage = handleProvider('getMessage', async (fn, req) => {
  const msg = await fn()
  return msg
})

const handleGetReadable = handleReadable(async (fn, req, res) => {
  let url = req.params.url // decodeURIComponent()
  const article = await fn(url)
  return article
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

const UrlPattern = require('url-pattern')

module.exports = cors(
  router(
    //    get('/api/photos/recent', handleGetRecentPhotos),
    get('/api/albums', handleGetAlbums),
    get('/api/albums/:id', handleGetPhotos),
    get('/api/playlists', handleGetPlaylists),
    get('/api/info', handleGetInfo),
    get('/api/message', handleGetMessage),
    get(
      new UrlPattern('/api/readable/:url', {
        segmentValueCharset: 'a-zA-Z0-9-_~ %.',
      }),
      handleGetReadable
    ),
    get('/api/preferences', handleGetPreferences),
    put('/api/preferences', handleSetPreferences),
    get('/*', notFound),
    options('/*', (req, res) => send(res, 200, '')) // any CORS preflight accepted
  )
)
