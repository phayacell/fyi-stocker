import { vuexfireMutations, firestoreAction } from 'vuexfire'
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
  ...vuexfireMutations,
  startLoad: state => (state.loading = true),
  endLoad: state => (state.loading = false)
}

export const actions = {
  initialize: firestoreAction(async ({ commit, bindFirestoreRef }, uid) => {
    commit('startLoad')
    await bindFirestoreRef(
      'contributes',
      contributesRef
        .where('uid', '==', uid)
        .orderBy('at', 'desc')
        .orderBy('created', 'desc')
    )
    commit('endLoad')
  }),
  add: firestoreAction(({}, data) => {
    contributesRef.add({
      uid: data.uid,
      at: data.contribute.at,
      url: data.contribute.url,
      title: data.contribute.title,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }),
  update: firestoreAction(({}, contribute) => {
    contributesRef.doc(contribute.id).update({
      at: contribute.at,
      url: contribute.url,
      title: contribute.title
    })
  }),
  delete: firestoreAction(({}, contribute) => {
    contributesRef.doc(contribute.id).delete()
  })
}
