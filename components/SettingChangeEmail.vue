<template lang="pug">
  v-card.elevation-1
    v-toolbar(dark flat color="primary")
      v-toolbar-title Change Email
    v-form(v-model="valid" ref="form" lazy-validation @submit.prevent)
      v-card-text
        v-text-field(:value="currentEmail" prepend-icon="email" label="current email" type="email" readonly)
        v-text-field(v-model="newEmail" prepend-icon="email" label="new email" type="email" :rules="$rules.required")
        v-text-field(v-model="currentPassword" prepend-icon="lock" label="current password" type="password" :rules="$rules.required")
      v-card-actions
        v-btn(type="submit" large color="primary" @click="changeEmail" :disabled="!valid || loading" :loading="loading") Submit
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      newEmail: '',
      currentPassword: '',
      valid: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    currentEmail() {
      if (!this.currentUser) return ''
      return this.currentUser.email
    },
    completedMessage() {
      return 'Please access the authentication link in the confirmation email sent and complete the authentication.'
    }
  },
  methods: {
    ...mapActions('auth', { authUpdateEmail: 'updateEmail' }),
    changeEmail() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.loading = true
      this.authUpdateEmail({
        currentPassword: this.currentPassword,
        newEmail: this.newEmail
      })
        .then(() => {
          this.$refs.form.reset()
          this.$nextTick(() => {
            this.currentPassword = ''
            this.newEmail = ''
          })
          this.$emit('completed', this.completedMessage)
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
