import Firebase from 'firebase'
import cookie from 'react-cookie'

const firebaseRef = new Firebase('https://blinding-fire-4472.firebaseio.com')
const usersRef = firebaseRef.child('users')
const token = 'token'

module.exports = {
  registerUser(name, email, pass) {
    return new Promise((resolve, reject) => {
      firebaseRef.createUser({
        email    : email,
        password : pass
      }, (error, userData) => {
        if (error) {
          reject(error)
        } else {
          this.createFirebaseUser(userData.uid, name)
          resolve(userData)
        }
      })
    })
  },

  createFirebaseUser(uid, name) {
    usersRef.child(uid).set({
      name: name
    })
  },

  fetchUserName(uid) {
    return new Promise((resolve, reject) => {
      usersRef.child(uid).once('value', (snapshot) => {
        if(snapshot) {
          resolve(snapshot.child('name').val())
        }
        else {
          reject('no user like that')
        }
      })
    })
  },

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
            this.fetchUserName(authData.uid)
              .then((name) => {
                this.saveToken(name)
                this.onChange(true)
                resolve(authData)
              })
              .catch((err) => { console.log(err )})
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
          this.saveToken(authData.facebook.displayName)
          this.onChange(true)
          resolve(authData)
        }
      })
    })
  },

  saveToken(name) {
    cookie.save(token, name)
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
