<template lang="pug">
  v-card.elevation-1
    v-toolbar(dark flat color="primary")
      v-toolbar-title Change Password
    v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
      v-card-text
        v-text-field(v-model="passwordCurrent" prepend-icon="lock" label="current password" type="password" :rules="requiredRules")
        v-text-field(v-model="passwordNew" prepend-icon="lock" label="new password" type="password" :rules="passwordRules")
        v-text-field(v-model="passwordConfirm" prepend-icon="lock" label="confirm new password" type="password" :rules="passwordConfirmRules")
      v-card-actions
        v-btn(type="submit" large color="primary" @click="changePassword" :disabled="!valid || loading" :loading="loading") Submit
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    const requiredRules = [v => !!v || 'Required field.']

    return {
      passwordCurrent: '',
      passwordNew: '',
      passwordConfirm: '',
      valid: false,
      loading: false,
      requiredRules: requiredRules,
      passwordRules: requiredRules.concat([
        v => (v && v.length >= 6) || 'Password should be at least 6 characters.'
      ]),
      passwordConfirmRules: requiredRules.concat([
        v => (v && v === this.passwordNew) || 'Password do not match.'
      ])
    }
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
