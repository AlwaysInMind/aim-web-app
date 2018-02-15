const request = require('request') // TODO swap to fetch

// Call a remote HTTP endpoint and return a JSON object
exports.requestObject = options => {
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error(
            `Remote resource ${options.url} returned status code: ${
              response.statusCode
            }: ${JSON.stringify(body)}`
          )
        )
      } else {
        const object = typeof body === 'string' ? JSON.parse(body) : body // FIXME throws
        resolve({ code: response.statusCode, object })
      }
    })
  })
}
