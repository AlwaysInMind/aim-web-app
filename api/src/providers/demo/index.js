const { getAlbums, getPhotos } = require('./photos.js')
const { getPlaylists } = require('./videos.js')

exports.demoProvider = { getAlbums, getPhotos, getPlaylists }
