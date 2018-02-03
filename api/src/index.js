const { send, createError } = require('micro')
const { router, get, options } = require('microrouter')

const cors = require('./cors')()
const { getAlbums, getPhotos } = require('./api/')

// custom handler to stop traces
const stopTraces = fn => async (req, res, ...args) => {
  try {
    return await fn(req, res, ...args)
  } catch (err) {
    send(res, err.statusCode || 500, err.message)
  }
}

const handleGetAlbums = async (req, res) => {
  const titles = await getAlbums(req, res)
  res.setHeader('Content-Type', 'application/json')
  send(res, 200, titles)
}

const handleGetPhotos = async (req, res) => {
  const photos = await getPhotos(req, res, req.params.id)
  res.setHeader('Content-Type', 'application/json')
  send(res, 200, photos)
}

const notFound = (req, res) => send(res, 404, 'Unknown route')

module.exports = cors(
  router(
    //    get('/api/photos/recent', handleGetRecentPhotos),
    get('/api/albums', handleGetAlbums),
    get('/api/albums/:id', handleGetPhotos),
    get('/*', notFound),
    options('/*', (req, res) => send(res, 200, '')) // any CORS preflight accepted
  )
)
