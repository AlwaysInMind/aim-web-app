const { createError } = require('micro')
const jwt = require('express-jwt')
// var jwks = require('jwks-rsa')

const AUTH_CONFIG = require('./auth0-variables')

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
