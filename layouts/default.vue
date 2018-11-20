<template lang="pug">
  v-app
    v-toolbar(app)
      v-toolbar-title FYI Stocker
      v-spacer
      v-toolbar-items
        v-btn(flat v-if="isAuthenticated" @click="signOut")
          span.mr-2 Sign Out
          v-icon flight_takeoff
    v-content
      v-container
        nuxt
    v-footer(app)
      v-spacer
      span &copy; 2018 hayato-yamashita
      v-spacer
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', { authSignOut: 'signOut' }),
    signOut: async function() {
      await this.authSignOut()
      await this.$router.push({ path: '/sign-in' })
    }
  }
}
</script>
