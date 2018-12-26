<template lang="pug">
  v-card.elevation-1
    v-toolbar(dark flat color="primary")
      v-toolbar-title Change Password
    v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
      v-card-text
        v-text-field(v-model="passwordCurrent" prepend-icon="lock" label="current password" type="password" :rules="rules")
        v-password-field(v-model="passwordNew" label="new passowrd")
        v-password-field(v-model="passwordConfirm" label="confirm new password" :confirm="passwordNew")
      v-card-actions
        v-btn(type="submit" large color="primary" @click="changePassword" :disabled="!valid || loading" :loading="loading") Submit
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      passwordCurrent: '',
      passwordNew: '',
      passwordConfirm: '',
      valid: false,
      loading: false
    }
  },
  computed: {
    rules: () => [v => !!v || 'Required field.']
  },
  methods: {
    ...mapActions('auth', { authUpdatePassword: 'updatePassword' }),
    changePassword: function() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.loading = true
      this.authUpdatePassword({
        passwordCurrent: this.passwordCurrent,
        passwordNew: this.passwordNew
      })
        .then(() => {
          this.$refs.form.reset()
          this.$nextTick(() => {
            this.passwordCurrent = ''
            this.passwordNew = ''
            this.passwordConfirm = ''
          })
          this.$emit('completed', 'Password Changed.')
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
