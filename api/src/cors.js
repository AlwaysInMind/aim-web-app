// From https://github.com/possibilities/micro-cors

const DEFAULT_ALLOW_METHODS = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
]

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept',
]

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 // 24 hours

const cors = options => handler => (req, res, ...restArgs) => {
  const { maxAge, origin, allowHeaders, exposeHeaders, allowMethods } =
    options || {}

  const preFlight = req.method === 'OPTIONS'

  res.setHeader('Access-Control-Allow-Origin', origin || '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (preFlight) {
    res.setHeader(
      'Access-Control-Max-Age',
      '' + (maxAge || DEFAULT_MAX_AGE_SECONDS)
    )

    res.setHeader(
      'Access-Control-Allow-Methods',
      (allowMethods || DEFAULT_ALLOW_METHODS).join(',')
    )

    res.setHeader(
      'Access-Control-Allow-Headers',
      (allowHeaders || DEFAULT_ALLOW_HEADERS).join(',')
    )

    if (exposeHeaders && exposeHeaders.length) {
      res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','))
    }
  }
  return handler(req, res, ...restArgs)
}

module.exports = cors
