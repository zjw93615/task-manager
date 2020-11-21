import EventEmitter from 'events'
import jwt_decode from "jwt-decode";

// 'loggedIn' is used in other parts of application. So, Don't forget to change there also
const localStorageKey = 'loggedIn'
const tokenStorageKey = 'token'
const tokenExpiryKey = 'tokenExpiry'
const loginEvent = 'loginEvent'


class AuthService extends EventEmitter {

  parseJwt (token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  storeLogin (token) {
    this.token = token
    this.payload = jwt_decode(token)

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.payload.exp * 1000)
    localStorage.setItem(tokenExpiryKey, this.tokenExpiry)
    localStorage.setItem(tokenStorageKey, this.token)
    localStorage.setItem(localStorageKey, 'true')
  }

  renewTokens () {
    // reject can be used as parameter in promise for using reject
    return new Promise((resolve) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        // return reject("Not logged in");
        resolve()
      }
    })
  }

  getAccessToken () {
    return localStorage.getItem(tokenStorageKey) || ''
  }

  logout () {
    localStorage.removeItem(localStorageKey)
    localStorage.removeItem(tokenExpiryKey)
    localStorage.removeItem(tokenStorageKey)
    localStorage.removeItem('userInfo')

    this.token = null
    this.tokenExpiry = null
    this.payload = null
  }

  isAuthenticated () {
    return (
      new Date(Date.now()) < new Date(localStorage.getItem(tokenExpiryKey)) &&
      localStorage.getItem(localStorageKey) === 'true'
    )
  }
}

export default new AuthService()
