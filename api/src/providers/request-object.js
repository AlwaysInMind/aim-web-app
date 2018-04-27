const request = require('request') // TODO swap to fetch

// Call a remote HTTP endpoint and return a JSON object
exports.request = options => {
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
        const json = typeof body === 'object'
        resolve({
          code: response.statusCode,
          headers: response.headers,
          ...(json && { object: body }),
          ...(!json && { body }),
        })
      }
    })
  })
}
