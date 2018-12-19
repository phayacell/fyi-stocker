<template lang="pug">
  v-app
    v-toolbar(app)
      v-toolbar-items
        v-btn(flat large @click="$router.push('/')") FYI Stocker
      v-spacer
      v-toolbar-items
        v-btn(flat v-if="isAuthenticated" @click="signOut")
          .mr-2 Sign Out
          v-icon flight_takeoff
    v-content
      v-container
        nuxt
    v-footer(app)
      v-spacer
      span &copy; 2018 hayato-yamashita
      v-spacer
    v-scroll-to-top
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ScrollToTop from '~/components/ScrollToTop'

export default {
  components: {
    'v-scroll-to-top': ScrollToTop
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', { authSignOut: 'signOut' }),
    signOut: async function() {
      await this.authSignOut()
      await this.$router.push('/sign-in')
    }
  }
}
</script>
