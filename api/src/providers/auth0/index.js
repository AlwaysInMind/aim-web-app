const { createError } = require('micro')
const jwt = require('express-jwt')
// var jwks = require('jwks-rsa')

const AUTH_CONFIG = require('./auth0-variables')
const { requestObject } = require('../../request-object')

const middleware = jwt({
  secret: AUTH_CONFIG.AUTH0_SIGNING_CERTIFICATE,
  /*
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}.well-known/jwks.json`,
  }), */
  audience: AUTH_CONFIG.AUTH0_API_ID,
  issuer: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/`,
  algorithms: ['RS256'],
})

// Decorator that checks the JWT signature and specified fields
exports.withAuth0 = wrapped => {
  return async (req, res, ...args) => {
    return new Promise((resolve, reject) => {
      middleware(req, res, async err => {
        // NB sometime middleware returns our result!
        if (err) {
          reject(
            createError(err.status || 500, `Auth error: ${err.message}`, err)
          )
        } else {
          const { iss, sub } = AUTH_CONFIG.DEMO_ACCESS_TOKEN
          req.params.isDemo = iss === req.user.iss && sub === req.user.sub

          const r = await wrapped(req, res, ...args)
          resolve(r)
        }
      })
    })
  }
}

// Get an access token for the Auth0 Admin API
exports.getAdminAccessToken = () => {
  const options = {
    method: 'POST',
    url: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}/oauth/token`,
    headers: { 'Content-Type': 'application/json' },
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

/* eslint-disable camelcase */
/* API payloads include snakecase identifiers */

async function callManagementAPI(verb, path, body = undefined) {
  const { object: { access_token } } = await exports.getAdminAccessToken()
  const options = {
    method: verb,
    url: `${AUTH_CONFIG.AUTH0_DOMAIN_URL}${path}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  }
  if (body) {
    options.body = body
    options.json = true
  }

  return requestObject(options)
}

exports.getUserMetadata = async userId => {
  const { object: { user_metadata } } = await callManagementAPI(
    'GET',
    `/api/v2/users/${userId}?fields=user_metadata&include_fields=true`
  )
  return user_metadata
}

exports.setUserMetadata = async (userId, metadata) => {
  const payload = {
    user_metadata: metadata,
  }
  const { object: { user_metadata } } = await callManagementAPI(
    'PATCH',
    `/api/v2/users/${userId}`,
    payload
  )
  return user_metadata
}

exports.getIdPIdent = async userId => {
  const { object: profile } = await callManagementAPI(
    'GET',
    `/api/v2/users/${userId}`
  )
  const accessToken = profile.identities[0].access_token // hidden from the Auth0 console
  return { userId, accessToken }
}
