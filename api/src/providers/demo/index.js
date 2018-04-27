const { getAlbums, getPhotos } = require('./photos.js')
const { getPlaylists } = require('./videos.js')
const { getInfo } = require('./info.js')

exports.demoProvider = { getAlbums, getPhotos, getPlaylists, getInfo }
