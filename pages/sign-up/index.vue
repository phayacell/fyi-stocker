<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12)
          v-card.elevation-1
            v-toolbar(dark flat color="primary")
              v-toolbar-title Sign up form
            v-form(v-model="valid" ref="form" @submit.prevent)
              v-card-text
                v-email-field(v-model="email" label="email" required :disabled="loading" autofocus)
                v-password-field(v-model="password" label="password" required :disabled="loading")
                v-password-field(v-model="confirmPassword" label="confirm password" :confirm="password" required :disabled="loading")
              v-card-actions
                v-btn(type="submit" large color="primary" @click="signUp" :disabled="!valid || loading" :loading="loading") Sign Up
        v-flex(xs12)
          v-card.elevation-1
            v-card-text.text-xs-center
              nuxt-link(color="primary" to="/sign-in") Already have an account?
</template>

<script>
import { mapActions } from 'vuex'

export default {
  meta: {
    ignoreAuth: true,
    rejectedCertified: true
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', { authSignUp: 'signUp' }),
    signUp() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.loading = true
      this.authSignUp({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/sign-up/verify')
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
