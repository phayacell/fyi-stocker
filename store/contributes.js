import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const contributesRef = db.collection('contributes')

export const state = () => ({
  contributes: []
})

export const getters = {
  contributes: state => state.contributes
}

export const mutations = {
  ...firebaseMutations
}

export const actions = {
  initialize: firebaseAction(async ({ bindFirebaseRef }) => {
    await bindFirebaseRef('contributes', contributesRef.orderBy('at', 'desc'))
  }),
  add: firebaseAction((context, data) => {
    contributesRef.add({
      uid: data.uid,
      at: data.contribute.at,
      url: data.contribute.url,
      title: data.contribute.title,
      created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }),
  update: firebaseAction((context, contribute) => {
    contributesRef.doc(contribute.id).update({
      at: contribute.at,
      url: contribute.url,
      title: contribute.title
    })
  }),
  delete: firebaseAction((context, contribute) => {
    contributesRef.doc(contribute.id).delete()
  })
}
