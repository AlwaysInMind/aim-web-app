const { createError } = require('micro')

const { requestObject } = require('../request-object')

// TODO always getting and empty object - cylic deps?
// const { DEFAULT_ALBUM_NAME } = require('../index.js')
const DEFAULT_ALBUM_NAME = 'Always In Mind'

exports.getAlbums = async googleAccessToken => {
  const ignore = ['Profile Photos', 'Auto Backup']
  const { object: { feed: { entry } } } = await requestAlbums(googleAccessToken)
  const titles = entry
    .filter(ent => ignore.indexOf(ent.title.$t) === -1)
    .map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
      thumbnail: ent.media$group.media$thumbnail.pop().url,
    }))
  return titles
}

exports.getDefaultAlbum = async googleAccessToken => {
  const isDefaultAlbumName = name =>
    name.toLowerCase() === DEFAULT_ALBUM_NAME.toLowerCase()
  const { object: { feed: { entry } } } = await requestAlbums(googleAccessToken)
  const titles = entry
    .filter(ent => {
      return isDefaultAlbumName(ent.title.$t)
    })
    .map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
      thumbnail: ent.media$group.media$thumbnail.pop().url,
    }))
  if (!titles.length) {
    throw createError(400, `No album called ${DEFAULT_ALBUM_NAME}`)
  }
  return titles[0]
}

exports.getPhotos = async (googleAccessToken, googleUserId, albumId) => {
  // Get the album list from google
  const { object: { feed: { entry } } } = await requestPhotos(
    googleAccessToken,
    googleUserId,
    albumId
  )
  let titles = []
  if (entry) {
    titles = entry.map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
      src: ent.content.src,
      //        timestamp: ent.gphoto$timestamp.$t,
    }))
  }
  return titles
}

// Get user Google Photos album list
function requestAlbums(accessToken) {
  const options = {
    method: 'GET',
    url:
      'https://picasaweb.google.com/data/feed/api/user/default?max-results=10&alt=json',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}

// Get user Google Album Photos list
function requestPhotos(accessToken, userId, albumId) {
  const options = {
    method: 'GET',
    url: `https://picasaweb.google.com/data/feed/api/user/${userId}/albumid/${albumId}?&alt=json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}

// Get phot meta data
// https://picasaweb.google.com/data/feed/projection/user/userID/albumid/albumID/photoid/photoID
