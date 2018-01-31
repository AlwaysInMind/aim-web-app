const { createError, sendError } = require('micro')

const jwt = require('express-jwt')
//var jwks = require('jwks-rsa')

//import ArgumentError from './errors/ArgumentError';
const ArgumentError = Error

module.exports = options => {
  if (!options || !(options instanceof Object)) {
    throw new ArgumentError('The options must be an object.')
  }
  if (!options.clientId || options.clientId.length === 0) {
    throw new ArgumentError('The Auth0 Client or API ID has to be provided.')
  }
  if (!options.clientSecret || options.clientSecret.length === 0) {
    throw new ArgumentError(
      'The Auth0 Client or API Secret has to be provided.'
    )
  }
  if (!options.domain || options.domain.length === 0) {
    throw new ArgumentError('The Auth0 Domain has to be provided.')
  }

  const middleware = jwt({
    secret: options.clientSecret,
    /*
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${domain}.well-known/jwks.json`,
    }),*/
    audience: options.clientId,
    issuer: options.domain,
    algorithms: options.algorithms,
  })

  return wrapped => {
    return (req, res, ...args) => {
      return new Promise(resolve => {
        middleware(req, res, async err => {
          if (err) {
            throw createError(
              err.status || 500,
              `Auth error: ${err.message}`,
              err
            )
          }
          const r = await wrapped(req, res, ...args)
          resolve(r)
        })
      })
    }
  }
}
