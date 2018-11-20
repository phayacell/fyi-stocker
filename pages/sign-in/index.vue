<template lang="pug">
  v-content
    v-container(fluid fill-height)
      v-layout(align-center justify-center)
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-toolbar(dark color="primary")
              v-toolbar-title Sign In Form
            v-card-text
              v-form
                v-text-field(v-model="email" prepend-icon="email" label="email" type="text" autofocus)
                v-text-field(v-model="password" prepend-icon="lock" label="password" type="password")
            v-card-actions
              v-btn(large color="primary" @click="signIn" :disabled="loading" :loading="loading") Sign In
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions('auth', { authSignIn: 'signIn' }),
    signIn: async function() {
      this.loading = true
      this.authSignIn({
        email: this.email,
        password: this.password
      })
        .then(async () => {
          await this.gotoRoute()
        })
        .catch(error => {
          alert(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    gotoRoute: async function() {
      if (this.isAuthenticated) {
        await this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
