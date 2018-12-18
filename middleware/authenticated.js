import auth from '~/plugins/auth'

export default async ({ store, route, redirect }) => {
  if (!store.getters['auth/isAuthenticated']) {
    const user = await auth()
    if (user) store.commit('auth/setUser', user)
  }

  const ignoreAuth = route.meta.some(meta => meta.ignoreAuth)
  if (!store.getters['auth/isAuthenticated'] && !ignoreAuth) {
    return redirect('/sign-in')
  }

  const rejectedCertified = route.meta.some(meta => meta.rejectedCertified)
  if (store.getters['auth/isAuthenticated'] && rejectedCertified) {
    return redirect('/')
  }
}
