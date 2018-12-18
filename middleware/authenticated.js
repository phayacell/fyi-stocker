import auth from '~/plugins/auth'

export default async function({ store, route, redirect }) {
  if (!store.getters['auth/isAuthenticated']) {
    const user = await auth()
    if (user) store.commit('auth/setUser', user)
  }

  const isIgnoreAuthenticated = () =>
    ['/sign-in', '/sign-up', '/sign-up/verify', '/readonly'].includes(
      route.path
    )
  if (!store.getters['auth/isAuthenticated'] && !isIgnoreAuthenticated()) {
    return redirect('/sign-in')
  }

  const isRefusalAuthenticated = () =>
    ['/sign-in', '/sign-up'].includes(route.path)
  if (store.getters['auth/isAuthenticated'] && isRefusalAuthenticated()) {
    return redirect('/')
  }
}
