const { createError } = require('micro')

const AUTH_CONFIG = require('../auth/auth0-variables')

// Create decorator that checks the JWT signature and specified fields
const jwtValidateDecorator = require('../auth/auth0')({
  clientId: AUTH_CONFIG.AUTH0_API_ID,
  clientSecret: AUTH_CONFIG.AUTH0_SIGNING_CERTIFICATE,
  algorithms: ['RS256'],
  domain: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/`,
})

// The main Function
module.exports.getAlbums = jwtValidateDecorator(async (req, res) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token', err)
  } // Get a token to access the admin API
  try {
    const { object: { access_token } } = await getAdminAccessToken()
    const userId = req.user.sub // has been added to the req by the decorator
    const { object: profile } = await getUserProfile(access_token, userId)
    const google_access_token = profile.identities[0].access_token // hidden from the Auth0 console

    // Get the album list from google
    const { object: { feed: { entry } } } = await getAlbums(google_access_token)

    const titles = entry.map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
    }))
    return titles
  } catch (err) {
    throw createError(400, err.message, err)
  }
})

module.exports.getPhotos = jwtValidateDecorator(async (req, res, id) => {
  if (!req.user) {
    throw createError(400, 'Problem with Authorization token', err)
  } // Get a token to access the admin API
  try {
    const { object: { access_token } } = await getAdminAccessToken()
    const userId = req.user.sub // has been added to the req by the decorator
    const { object: profile } = await getUserProfile(access_token, userId)
    const google_access_token = profile.identities[0].access_token // hidden from the Auth0 console

    // Get the album list from google
    const { object: { feed: { entry } } } = await getPhotos(
      google_access_token,
      id
    )

    const titles = entry.map(ent => ({
      id: ent.gphoto$id.$t,
      title: ent.title.$t,
      src: ent.content.src,
    }))
    return titles
  } catch (err) {
    throw createError(400, err.message, err)
  }
})

const request = require('request') // TODO swap to fetch

// Call a remote HTTP endpoint and return a JSON object
function requestObject(options) {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else if (200 > response.statusCode || 299 < response.statusCode) {
        reject(
          new Error(
            `Remote resource ${options.url} returned status code: ${
              response.statusCode
            }: ${body}`
          )
        )
      } else {
        const object = typeof body === 'string' ? JSON.parse(body) : body // FIXME throws
        resolve({ code: response.statusCode, object })
      }
    })
  })
}

// Get an access token for the Auth0 Admin API
function getAdminAccessToken() {
  const options = {
    method: 'POST',
    url: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: AUTH_CONFIG.AUTH0_ADMIN_CLIENT_ID,
      client_secret: AUTH_CONFIG.AUTH0_ADMIN_CLIENT_SECRET,
      audience: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/api/v2/`,
      grant_type: 'client_credentials',
    },
    json: true,
  }
  return requestObject(options)
}

// Get the user's profile from the Admin API
function getUserProfile(accessToken, userID) {
  const options = {
    method: 'GET',
    url: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/api/v2/users/${userID}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}

// Get user Google Photos album list
function getAlbums(accessToken) {
  const options = {
    method: 'GET',
    //url: `https://www.googleapis.com/gmail/v1/users/me/labels`,
    url: 'https://picasaweb.google.com/data/feed/api/user/default?alt=json',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}

// Get user Google Photos album list
function getPhotos(accessToken, albumID) {
  const options = {
    method: 'GET',
    //url: `https://www.googleapis.com/gmail/v1/users/me/labels`,
    url: `https://picasaweb.google.com/data/feed/api/user/default/albumid/${albumID}?alt=json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return requestObject(options)
}
