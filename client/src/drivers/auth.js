//import history from '../history'
import auth0 from 'auth0-js'

import { AUTH0_CONFIG, LOGIN_CALLBACK_PATH, DEMO_USER } from './auth0-variables'
import { promisify } from './promisify'

function pathToURL(path) {
  return `${window.location.protocol}//${window.location.hostname}:${
    window.location.port
  }${path}`
}
class Auth0 {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.DOMAIN,
    clientID: AUTH0_CONFIG.CLIENTID,
    audience: AUTH0_CONFIG.APIID,
    responseType: 'token id_token',
    scope: 'openid profile photos',
    redirectUri: pathToURL(LOGIN_CALLBACK_PATH),
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  loginCallbackRoute = LOGIN_CALLBACK_PATH

  login() {
    this.auth0.authorize()
  }

  async handleAuthentication() {
    // timeout
    const parseHash = promisify(this.auth0.parseHash.bind(this.auth0))
    try {
      const authResult = await parseHash()
      if (authResult && authResult.accessToken && authResult.idToken) {
        await this.setSession(authResult)
      } else {
        throw new Error('Badly formed hash')
      }
    } catch (error) {
      console.error(`Could not process Auth0 hash ${error}`)
    }
  }

  async setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    const getUserInfo = promisify(
      this.auth0.client.userInfo.bind(this.auth0.client)
    )
    const user = await getUserInfo(authResult.accessToken)
    localStorage.setItem('gtoken', JSON.stringify(user))
  }

  clearSession() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('gtoken')
  }

  logout(logoutIdP = false) {
    const logoutGoogle = function() {
      document.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${pathToURL(
        '/login'
      )}`
    }
    this.auth0.logout({
      /*federated: logoutIdP,*/ // google ognores this and URL is incorrect
      returnTo: pathToURL('/login'),
    })
    if (logoutIdP) {
      logoutGoogle()
    }
    this.clearSession()
  }

  get isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  get user() {
    const gtoken = localStorage.getItem('gtoken') //TODO review
    const name = JSON.parse(gtoken).name
    return this.isAuthenticated ? name : '<none>'
  }

  get isDemo() {
    return this.user === DEMO_USER.EMAIL
  }

  get accessToken() {
    return localStorage.getItem('access_token')
  }
}

export const auth = new Auth0()
