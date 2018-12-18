import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user && state.user.emailVerified
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async signUp({}, data) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(async auth => {
          await auth.user.updateProfile({ displayName: data.email })
          await auth.user.sendEmailVerification({ url: location.origin })
        })
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async signIn({ commit }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(async auth => {
          if (auth.user.emailVerified) return auth

          await firebase.auth().signOut()
          commit('setUser', null)

          return Promise.reject('Can not confirm the email.')
        })
        .then(auth => commit('setUser', auth.user))
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async signOut({ dispatch, commit }) {
    try {
      await firebase.auth().signOut()
      commit('setUser', null)
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  }
}
