//import history from '../history'
import auth0 from 'auth0-js'
import { AUTH0_CONFIG, LOGIN_CALLBACK_PATH } from './auth0-variables'

// A basic promisify for functions with node style callbacks ie (err, value)
function promisify(original) {
  function fn(...args) {
    const promise = new Promise((resolve, reject) => {
      try {
        original.call(this, ...args, (err, ...values) => {
          if (err) {
            reject(err)
          } else {
            resolve(values[0])
          }
        })
      } catch (err) {
        reject(err)
      }
    })
    return promise
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original))
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original))
}

function pathToURL(path) {
  return `${window.location.protocol}//${window.location.hostname}:${
    window.location.port
  }${path}`
}

class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.DOMAIN,
    clientID: AUTH0_CONFIG.CLIENTID,
    audience: AUTH0_CONFIG.APIID,
    responseType: 'token id_token',
    scope: 'openid profile photos',
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  loginCallbackRoute = LOGIN_CALLBACK_PATH

  login() {
    this.auth0.authorize({
      redirectUri: pathToURL(LOGIN_CALLBACK_PATH),
    })
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
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('gtoken')
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

  get accessToken() {
    return localStorage.getItem('access_token')
  }
}

export default new Auth()
