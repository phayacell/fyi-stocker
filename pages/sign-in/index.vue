<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-toolbar(dark color="primary")
              v-toolbar-title Sign in form
            v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
              v-card-text
                v-text-field(v-model="email" prepend-icon="email" label="email" type="text" :rules="rules" autofocus)
                v-text-field(v-model="password" prepend-icon="lock" label="password" type="password" :rules="rules")
              v-card-actions
                v-btn(type="submit" large color="primary" @click="signIn" :disabled="!valid || loading" :loading="loading") Sign In
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-card-text.text-xs-center
              nuxt-link(color="primary" to="/sign-up") Create account?
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false,
      rules: [v => !!v || 'Required field.']
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', { authSignIn: 'signIn' }),
    signIn: function() {
      this.loading = true
      this.authSignIn({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          alert(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
