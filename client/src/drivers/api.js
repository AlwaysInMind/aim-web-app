// In dev mode we use the webpack proxy to redirect to port localhost:3001
export const API_DOMAIN =
  process.env.NODE_ENV === 'production' ? 'https://alwaysinmindapi.now.sh' : ''

export async function callAPI(accessToken, verb, path, body = undefined) {
  const options = {
    method: verb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  const endpoint = `${API_DOMAIN}${path}`
  const res = await fetch(endpoint, options)
  const json = await res.json()
  return json
}
