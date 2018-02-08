const { createError } = require('micro')

const { requestObject } = require('../request-object')
const { withAuth0, getIdPIdent } = require('../auth/auth0')

module.exports.getAlbums = withAuth0(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token') // TODO - fix unhandled rejection
  } // Get a token to access the admin API
  try {
    const { accessToken: googleAccessToken } = await getIdPIdent(req.user.sub)

    // Get the album list from google
    const { object: { feed: { entry } } } = await requestAlbums(
      googleAccessToken
    )
    const titles = entry.map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
    }))
    return titles
  } catch (err) {
    throw createError(400, err.message, err)
  }
})

exports.getPhotos = withAuth0(async (req, res, albumId) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token')
  } // Get a token to access the admin API
  try {
    const {
      userId: googleUserId,
      accessToken: googleAccessToken,
    } = await getIdPIdent(req.user.sub)

    // Get the album list from google
    const { object: { feed: { entry } } } = await requestPhotos(
      googleAccessToken,
      googleUserId.split('|')[1],
      albumId
    )
    let titles = []
    if (entry) {
      titles = entry.map(ent => ({
        id: ent.gphoto$id.$t,
        title: ent.title.$t,
        src: ent.content.src,
      }))
    }
    return titles
  } catch (err) {
    throw createError(400, err.message, err) // TODO fix this
  }
})

// Get user Google Photos album list
function requestAlbums(accessToken) {
  const options = {
    method: 'GET',
    url: 'https://picasaweb.google.com/data/feed/api/user/default?alt=json',
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
    url:
      albumId === 'latest'
        ? `https://picasaweb.google.com/data/feed/api/user/${userId}?kind=photo&max-results=10&alt=json`
        : `https://picasaweb.google.com/data/feed/api/user/${userId}/albumid/${albumId}?&max-results=10&alt=json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}
