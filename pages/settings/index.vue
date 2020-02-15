<template lang="pug">
  section
    v-container
      .display-2.primary--text.mb-3 Settings
      v-layout(row wrap mb-4)
        v-flex(xs12)
          setting-change-email(@completed="completed")
      v-layout(row wrap mb-4)
        v-flex(xs12)
          setting-change-password(@completed="completed")
      v-layout(row wrap mb-4)
        v-flex(xs12)
          setting-delete-account(@completed="completed")
    v-snackbar(v-model="snackbar" bottom vertical dark color="success") {{ snackbarMessage }}
      v-btn(flat dark @click="snackbar = false") Close
</template>

<script>
import SettingChangeEmail from '~/components/SettingChangeEmail'
import SettingChangePassword from '~/components/SettingChangePassword'
import SettingDeleteAccount from '~/components/SettingDeleteAccount'

export default {
  components: {
    'setting-change-email': SettingChangeEmail,
    'setting-change-password': SettingChangePassword,
    'setting-delete-account': SettingDeleteAccount
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: ''
    }
  },
  methods: {
    completed(message) {
      this.snackbar = true
      this.snackbarMessage = message
    }
  }
}
</script>
