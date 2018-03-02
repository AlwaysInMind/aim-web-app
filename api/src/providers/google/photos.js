const { requestObject } = require('../request-object')

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

// Get user Google Photos album list
function requestPhotos(accessToken, userId, albumId) {
  const options = {
    method: 'GET',
    url: `https://picasaweb.google.com/data/feed/api/user/${userId}/albumid/${albumId}?&max-results=10&alt=json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}
