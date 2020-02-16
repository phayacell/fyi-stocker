<template lang="pug">
  section
    v-container
      v-card
        v-form(ref="form" v-model="valid" @submit.prevent)
          v-card-text
            v-date-field(v-model="shareFrom" label="from" required :disabled="formLoading")
            v-date-field(v-model="shareTo" label="to" required :disabled="formLoading")
          v-card-actions
            v-btn(type="submit" large color="primary" @click="submit" :disabled="!valid || formLoading" :loading="formLoading") Create link
            v-btn(type="button" large color="accent" @click="clear" :disabled="formLoading" :loading="formLoading") Clear
    v-container
      share-table(:contributes="contributes" :loading="contributeLoading")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShareTable from '~/components/ShareTable'

export default {
  components: {
    'share-table': ShareTable
  },
  data() {
    return {
      shareFrom: '',
      shareTo: '',
      valid: false,
      formLoading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('contributes', {
      originContributes: 'contributes',
      contributeLoading: 'loading'
    }),
    contributes: context => {
      if (!context.valid) return []

      const shareFrom = new Date(context.shareFrom)
      const shareTo = new Date(context.shareTo)

      return context.originContributes.filter(contribute => {
        const at = new Date(contribute.at)
        return shareFrom <= at && at <= shareTo
      })
    }
  },
  created() {
    this.initialize(this.currentUser.uid)
  },
  methods: {
    ...mapActions('contributes', ['initialize']),
    submit() {
      if (!this.valid) return false

      // TODO: share something
    },
    clear() {
      this.$refs.form.reset()
      this.$nextTick(() => this.initializeParams())
    }
  }
}
</script>
