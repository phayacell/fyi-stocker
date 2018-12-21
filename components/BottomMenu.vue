<template lang="pug">
  v-bottom-sheet(v-model="isShow" lazy)
    v-btn(slot="activator" v-model="isShow" fab fixed bottom left color="primary")
      v-icon menu
      v-icon close
    v-list
      v-list-tile(@click="isShow = false" to="/")
        v-list-tile-action
          v-icon home
        v-list-tile-content Home
      v-list-tile(v-if="isAuthenticated" @click="isShow = false" to="/settings")
        v-list-tile-action
          v-icon settings
        v-list-tile-content Settings
      v-list-tile(v-if="isAuthenticated" @click="signOut")
        v-list-tile-action
          v-icon flight_takeoff
        v-list-tile-content Sign Out
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', { authSignOut: 'signOut' }),
    signOut: async function() {
      await this.authSignOut()
      await this.$router.push('/sign-in')
      this.isShow = false
    }
  }
}
</script>
