<template lang="pug">
  v-bottom-sheet(v-model="isShow" lazy)
    v-btn(slot="activator" v-model="isShow" fab fixed bottom left color="secondary")
      v-icon menu
      v-icon close
    v-list
      v-list-tile(@click="isShow = false" to="/")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title Home
      v-list-tile(disabled)
        v-list-tile-action
          v-icon settings
        v-list-tile-content
          v-list-tile-title Settings
      v-list-tile(@click="signOut" v-if="isAuthenticated")
        v-list-tile-action
          v-icon flight_takeoff
        v-list-tile-content
          v-list-tile-title Sign Out
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
