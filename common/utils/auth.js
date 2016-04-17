import Firebase from 'firebase'
import cookie from 'react-cookie'

const firebaseRef = new Firebase('https://blinding-fire-4472.firebaseio.com')
const token = 'token'

module.exports = {
  login(email, pass) {
    return new Promise((resolve, reject) => {
      if(cookie.load(token)) {
        this.onChange(true)
      }
      if(arguments.length) {
        firebaseRef.authWithPassword({
          "email": email,
          "password": pass
        }, (error, authData) => {
          if (error) {
            this.onChange(false)
            reject(error)
          } else {
            cookie.save(token, authData)
            this.onChange(true)
            resolve(authData)
          }
        })
      }
    })
  },

  loginFacebook(cb) {
    return new Promise((resolve, reject) => {
      firebaseRef.authWithOAuthPopup("facebook", (error, authData) => {
        if (error) {
          this.onChange(false)
          reject(error)
        } else {
          cookie.save(token, authData)
          this.onChange(true)
          resolve(authData)
        }
      })
    })
  },

  getToken() {
    return cookie.load(token)
  },

  loggedIn() {
    return !!cookie.load(token)
  },

  logout() {
    cookie.remove(token)
    this.onChange(false)
  },

  onChange() {},
}
