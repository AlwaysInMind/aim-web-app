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

// Get user Google users playlists
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
