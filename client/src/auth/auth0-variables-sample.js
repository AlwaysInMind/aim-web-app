const CALLBACKPATH = '/auth/signed-in'

export const AUTH0_CONFIG = {
  DOMAIN: '<DOMAIN>.auth0.com',
  CLIENTID: 'CLIENT_ID',
  CALLBACKPATH,
  CALLBACKURL: `${window.location.protocol}//${window.location.hostname}:${
    window.location.port
  }${CALLBACKPATH}`,
  APIID: '<API_ID>',
}
