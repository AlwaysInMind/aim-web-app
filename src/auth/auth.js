// This object contains the auth logic Log/out
// and is passed around Components so they can access tokens etc
// Would be better to separate these 2 concerns
const auth = {
  login: async () => {
    const authResult = 'abc'
    auth.setSession(authResult)
  },

  // store in session storage so available between pages and on refresh
  setSession: authResult => {
    localStorage.setItem('access_token', authResult.auth_token)
    localStorage.setItem('expires_at', authResult.auth_token_expires_at)
    localStorage.setItem('user', authResult.first_name)
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
  },

  get isAuthenticated() {
    return false
    const expiresAt = localStorage.getItem('expires_at')
    return expiresAt && new Date().getTime() < new Date(expiresAt).getTime()
  },

  get user() {
    return auth.isAuthenticated ? 'Steve' : '<none>'
  },

  get accessToken() {
    return localStorage.getItem('access_token')
  },
}

export default auth
