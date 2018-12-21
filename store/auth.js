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
  async signUp({}, { email, password }) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async auth => {
          await auth.user.updateProfile({ displayName: email })
          await auth.user.sendEmailVerification({ url: location.origin })
        })
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async signIn({ dispatch, commit }, { email, password }) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async auth => {
          if (auth.user.emailVerified) return auth
          await dispatch('signOut')
          return Promise.reject('Can not confirm the email.')
        })
        .then(auth => commit('setUser', auth.user))
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async signOut({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('setUser', null)
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async updatePassword({ state, dispatch }, { passwordCurrent, passwordNew }) {
    try {
      await dispatch('reauthenticate', passwordCurrent)
      await state.user.updatePassword(passwordNew)
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  reauthenticate({ state }, passwordCurrent) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      state.user.email,
      passwordCurrent
    )
    return state.user.reauthenticateAndRetrieveDataWithCredential(credential)
  }
}
