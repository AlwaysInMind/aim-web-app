const { getAlbums, getPhotos } = require('./photos.js')
const { getPlaylists, getVideos } = require('./videos.js')

exports.demoProvider = { getAlbums, getPhotos, getPlaylists, getVideos }
