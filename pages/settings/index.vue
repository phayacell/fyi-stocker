<template lang="pug">
  section.container
    v-container(fluid grid-list-lg)
      .display-2.primary--text.mb-3 Settings
      v-layout(row wrap)
        v-flex(xs12)
          setting-change-password(@completed="completed")
    v-snackbar(v-model="snackbar" bottom vertical dark color="success") {{ snackbarMessage }}
      v-btn(flat dark @click="snackbar = false") Close
</template>

<script>
import SettingChangePassword from '~/components/SettingChangePassword'

export default {
  components: {
    'setting-change-password': SettingChangePassword
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
