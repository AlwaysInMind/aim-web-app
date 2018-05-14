const { request } = require('../request-object')
const { MS_COG_SERVICES_KEY } = require('../auth0/auth0-variables')

exports.getAlbums = async googleAccessToken => {
  const ignore = ['Profile Photos', 'Auto Backup']
  const {
    object: {
      feed: { entry },
    },
  } = await requestAlbums(googleAccessToken)
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
  const {
    object: {
      feed: { entry },
    },
  } = await requestPhotos(googleAccessToken, googleUserId, albumId)
  let photos = []
  if (entry) {
    photos = entry.map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
      src: ent.media$group.media$content.slice(-1)[0].url,
      medium: ent.media$group.media$content.slice(-1)[0].medium,
      //        timestamp: ent.gphoto$timestamp.$t,
    }))
  }
  const enhancedPhotos = await enhancePhotos(photos)
  return enhancedPhotos
}

function enhancePhotos(photos) {
  const requests = photos.map(({ src }) =>
    requestDescription(src).catch(e => undefined)
  )
  return Promise.all(requests).then(descriptions => {
    const enhanced = descriptions
      .map(d => (d ? d.object.description.captions[0].text : ''))
      .map((d, i) => ({ ...photos[i], description: d }))
    return enhanced
  })
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
    json: true,
  }
  return request(options)
}

// Get user Google Album Photos list
function requestPhotos(accessToken, userId, albumId) {
  const options = {
    method: 'GET',
    url: `https://picasaweb.google.com/data/feed/api/user/${userId}/albumid/${albumId}?&alt=json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  }
  return request(options)
}

function requestDescription(url) {
  const options = {
    method: 'POST',
    url: `https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description&language=en`,
    headers: {
      'Ocp-Apim-Subscription-Key': MS_COG_SERVICES_KEY,
    },
    body: { url },
    json: true,
  }
  return request(options)
}
