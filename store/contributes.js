import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contributesRef = db.collection('contributes')

export const state = () => ({
  contributes: [],
  loading: false
})

export const getters = {
  contributes: state => state.contributes,
  loading: state => state.loading
}

export const mutations = {
  ...firebaseMutations,
  startLoad: state => (state.loading = true),
  endLoad: state => (state.loading = false)
}

export const actions = {
  initialize: firebaseAction(async ({ commit, bindFirebaseRef }, uid) => {
    commit('startLoad')
    await bindFirebaseRef(
      'contributes',
      contributesRef
        .where('uid', '==', uid)
        .orderBy('at', 'desc')
        .orderBy('created', 'desc')
    )
    commit('endLoad')
  }),
  add: firebaseAction(({}, data) => {
    contributesRef.add({
      uid: data.uid,
      at: data.contribute.at,
      url: data.contribute.url,
      title: data.contribute.title,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }),
  update: firebaseAction(({}, contribute) => {
    contributesRef.doc(contribute.id).update({
      at: contribute.at,
      url: contribute.url,
      title: contribute.title
    })
  }),
  delete: firebaseAction(({}, contribute) => {
    contributesRef.doc(contribute.id).delete()
  })
}
