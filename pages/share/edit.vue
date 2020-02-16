<template lang="pug">
  section
    v-bottom-sheet(v-model="sheet")
      v-card
        v-card-title
          v-icon(left) share
          span.title Share URL
        v-card-text
          v-text-field(v-model="shareURL" type="url" prepend-icon="link" readonly autofocus)
    v-container
      v-card
        v-form(ref="form" v-model="valid" @submit.prevent)
          v-card-text
            v-date-field(v-model="shareFrom" label="from" required)
            v-date-field(v-model="shareTo" label="to" required)
          v-card-actions
            v-btn(type="submit" large color="primary" @click="share" :disabled="!valid") Create link
            v-btn(type="button" large color="accent" @click="clear") Clear
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
      formLoading: false,
      sheet: false
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
    },
    shareURL: context => {
      if (!context.valid) return null
      const query = {
        uid: context.currentUser.uid,
        from: context.shareFrom,
        to: context.shareTo
      }
      const { href } = context.$router.resolve({ name: 'share', query: query })
      return location.origin + href
    }
  },
  created() {
    this.initialize(this.currentUser.uid)
  },
  methods: {
    ...mapActions('contributes', ['initialize']),
    share() {
      if (!this.valid) return false
      this.sheet = true
    },
    clear() {
      this.$refs.form.reset()
      this.$nextTick(() => this.initializeParams())
    },
    close() {
      this.sheet = false
    }
  }
}
</script>
