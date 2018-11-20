import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async signIn({ commit }, data) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(ret => commit('setUser', ret.user))
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  },
  async signOut({ dispatch, commit }) {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => commit('setUser', null))
    } catch (error) {
      console.error('reject[error]: ' + error)
      throw error
    }
  }
}
