<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12)
          v-card.elevation-1
            v-toolbar(dark flat color="primary")
              v-toolbar-title Sign in form
            v-form(v-model="valid" ref="form" @submit.prevent)
              v-card-text
                v-text-field(v-model="email" prepend-icon="email" label="email" type="email" :rules="[$rules.required]" :disabled="loading" autofocus)
                v-password-field(v-model="password" label="password" required :disabled="loading")
              v-card-actions
                v-btn(type="submit" large color="primary" @click="signIn" :disabled="!valid || loading" :loading="loading") Sign In
        v-flex(xs12)
          v-card.elevation-1
            v-card-text.text-xs-center
              nuxt-link(color="primary" to="/sign-up") Create account?
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
      valid: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', { authSignIn: 'signIn' }),
    signIn() {
      if (!this.$refs.form.validate()) {
        return false
      }

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
