<template lang="pug">
  v-card.elevation-1
    v-toolbar(dark flat color="primary")
      v-toolbar-title Change password
    v-form(v-model="valid" ref="form" @submit.prevent)
      v-card-text
        v-password-field(v-model="currentPassword" label="current password" required :disabled="loading")
        v-password-field(v-model="newPassword" label="new passowrd" required :disabled="loading")
        v-password-field(v-model="confirmPassword" label="confirm new password" :confirm="newPassword" required :disabled="loading")
      v-card-actions
        v-btn(type="submit" large color="primary" @click="changePassword" :disabled="!valid || loading" :loading="loading") Submit
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      valid: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', { authUpdatePassword: 'updatePassword' }),
    changePassword() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.loading = true
      this.authUpdatePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
        .then(() => {
          this.$refs.form.reset()
          this.$nextTick(() => {
            this.currentPassword = ''
            this.newPassword = ''
            this.confirmPassword = ''
          })
          this.$emit('completed', 'Password changed.')
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
