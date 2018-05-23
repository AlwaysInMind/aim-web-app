const { request } = require('../request-object')

exports.getMessage = async googleAccessToken => {
  const {
    object: { messages },
  } = await requestMessageList(googleAccessToken, 'from:steve')
  const latestId = messages[0].id
  const {
    object: {
      payload: { body, headers },
    },
  } = await requestMessage(googleAccessToken, latestId)
  console.log(body, headers)
  const subject = headers.filter(header => header.name === 'Subject')[0].value
  const decodedBody = Buffer.from(body.data, 'base64').toString()
  return [
    {
      id: latestId,
      subject,
      body: decodedBody,
    },
  ]
}

// Get user Google users tasks
function requestMessageList(accessToken, q) {
  const options = {
    method: 'GET',
    url:
      'https://www.googleapis.com/gmail/v1/users/allwaysinminddemo%40gmail.com/messages',
    qs: { q },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  }
  return request(options)
}

// Get user Google users tasks
function requestMessage(accessToken, id) {
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/gmail/v1/users/allwaysinminddemo%40gmail.com/messages/${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    json: true,
  }
  return request(options)
}
