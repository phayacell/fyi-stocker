<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-toolbar(dark flat color="primary")
              v-toolbar-title Sign in form
            v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
              v-card-text
                v-text-field(v-model="email" prepend-icon="email" label="email" type="text" :rules="rules" autofocus)
                v-password-field(v-model="password")
              v-card-actions
                v-btn(type="submit" large color="primary" @click="signIn" :disabled="!valid || loading" :loading="loading") Sign In
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-card-text.text-xs-center
              nuxt-link(color="primary" to="/sign-up") Create account?
</template>

<script>
import { mapActions } from 'vuex'
import VPasswordField from '~/components/VPasswordField'

export default {
  meta: {
    ignoreAuth: true,
    rejectedCertified: true
  },
  components: {
    'v-password-field': VPasswordField
  },
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false
    }
  },
  computed: {
    rules: () => [v => !!v || 'Required field.']
  },
  methods: {
    ...mapActions('auth', { authSignIn: 'signIn' }),
    signIn: function() {
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
