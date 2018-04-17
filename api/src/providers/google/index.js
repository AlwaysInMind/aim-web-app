const { getAlbums, getPhotos } = require('./photos.js')
const { getPlaylists, getVideos } = require('./videos.js')

exports.googleProvider = { getAlbums, getPhotos, getPlaylists, getVideos }
