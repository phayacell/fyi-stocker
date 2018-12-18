<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-toolbar(dark color="primary")
              v-toolbar-title Sign up form
            v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
              v-card-text
                v-text-field(v-model="email" prepend-icon="email" label="email" type="text" :rules="requiredRules" autofocus)
                v-text-field(v-model="password" prepend-icon="lock" label="password" type="password" :rules="passwordRules")
                v-text-field(v-model="confirmPassword" prepend-icon="lock" label="confirm password" type="password" :rules="confirmPasswordRules")
              v-card-actions
                v-btn(type="submit" large color="primary" @click="signUp" :disabled="!valid || loading" :loading="loading") Sign Up
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-card-text.text-xs-center
              nuxt-link(color="primary" to="/sign-in") Already have an account?
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  meta: {
    ignoreAuth: true,
    rejectedCertified: true
  },
  data() {
    const requiredRules = [v => !!v || 'Required field.']

    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      loading: false,
      requiredRules: requiredRules,
      passwordRules: requiredRules.concat([
        v => (v && v.length >= 6) || 'Password should be at least 6 characters.'
      ]),
      confirmPasswordRules: requiredRules.concat([
        v => (v && v === this.password) || 'Password do not match.'
      ])
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions('auth', { authSignUp: 'signUp' }),
    signUp: async function() {
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
