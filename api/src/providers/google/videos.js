const { requestObject } = require('../request-object')

exports.getPlaylists = async googleAccessToken => {
  //  const ignore = ['']
  const {
    object: { items },
  } = await requestPlaylists(googleAccessToken)
  const titles = items
    //    .filter(ent => ignore.indexOf(ent.snippet.title) === -1)
    .map(ent => ({
      id: ent.id,
      title: ent.snippet.title,
      thumbnail: ent.snippet.thumbnails.medium.url,
    }))
  return titles
}

/*
exports.getVideos = async (googleAccessToken, googleUserId, albumId) => {
  // Get the album list from google
  const {
    object: { items },
  } = await requestVideos(googleAccessToken, albumId)
  let titles = []
  if (items) {
    titles = items.map(ent => ({
      id: ent.id,
      title: ent.snippet.title,
      src: ent.snippet.resourceId.videoId,
      //        timestamp: ent.gphoto$timestamp.$t,
    }))
  }
  return titles
}
*/

// Get user Google Photos album list
function requestPlaylists(accessToken) {
  const options = {
    method: 'GET',
    url:
      'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}

/*
// Get user Google Album Photos list
function requestVideos(accessToken, albumId) {
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${albumId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}
*/
