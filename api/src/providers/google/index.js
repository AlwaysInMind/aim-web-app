const { getAlbums, getPhotos } = require('./photos.js')
const { getPlaylists } = require('./videos.js')

exports.googleProvider = { getAlbums, getPhotos, getPlaylists }
