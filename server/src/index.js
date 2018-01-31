const { send } = require('micro')
const { router, get } = require('microrouter')

const { getAlbums, getPhotos } = require('./api/')

const handleGetAlbums = async (req, res) => {
  const titles = await getAlbums(req, res)
  res.setHeader('Content-Type', 'application/json')
  const body = JSON.stringify(titles)
  send(res, 200, body)
}

const handleGetPhotos = async (req, res) => {
  const photos = await getPhotos(req, res, req.params.id)
  res.setHeader('Content-Type', 'application/json')
  const body = JSON.stringify(photos)
  send(res, 200, body)
}

module.exports = router(
  get('/api/albums', handleGetAlbums),
  get('/api/albums/:id', handleGetPhotos)
)
