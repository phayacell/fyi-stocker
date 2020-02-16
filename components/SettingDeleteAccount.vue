<template lang="pug">
  v-card.elevation-1
    v-toolbar(dark flat color="error")
      v-toolbar-title Delete account
    v-form(v-model="valid" ref="form" @submit.prevent)
      v-card-text
        p.mb-4 Once you delete your account, there is no going back. Please be certain.
        v-password-field(v-model="currentPassword" label="current password" required :disabled="loading")
      v-card-actions
        v-btn(type="submit" large flat color="error" @click="deleteAccount" :disabled="!valid || loading" :loading="loading")
          | Delete your account
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      currentPassword: '',
      valid: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', {
      authDeleteAccount: 'deleteAccount',
      authSignOut: 'signOut'
    }),
    deleteAccount() {
      if (!this.$refs.form.validate()) return false
      if (!confirm('Are you sure you want to delete it?')) return false

      this.loading = true
      this.authDeleteAccount({ currentPassword: this.currentPassword })
        .then(async () => {
          await this.authSignOut()
          await this.$router.push('/sign-in')
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
