<template lang="pug">
  section
    v-container
      v-card
        v-form(ref="form" v-model="valid" @submit.prevent)
          v-card-text
            v-text-field(v-model="shareFrom" @blur="shareFrom = formatDate(shareFrom)" prepend-icon="calendar_today" label="from" :rules="$rules.required" required :disabled="formLoading")
            v-text-field(v-model="shareTo" @blur="shareTo = formatDate(shareTo)" prepend-icon="calendar_today" label="to" :rules="$rules.required" required :disabled="formLoading")
          v-card-actions
            v-btn(type="submit" large color="primary" @click="submit" :disabled="!valid || formLoading" :loading="formLoading") Create link
            v-btn(type="button" large color="accent" @click="clear" :disabled="formLoading" :loading="formLoading") Clear
    v-container
      share-table(:contributes="contributes" :loading="contributeLoading")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import format from 'date-fns/format'
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
    dateRegex: () => RegExp(/^\d{4}-\d{2}-\d{2}/),
    isValid: context => {
      if (!context.shareFrom) return false
      if (!context.shareTo) return false
      if (!context.dateRegex.test(context.shareFrom)) return false
      if (!context.dateRegex.test(context.shareTo)) return false
      return true
    },
    contributes: context => {
      if (!context.isValid) return []

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
      if (!this.$refs.form.validate()) return false

      this.shareFrom = this.formatDate(this.shareFrom)
      this.shareTo = this.formatDate(this.shareTo)

      // TODO: share something
    },
    clear() {
      this.$refs.form.reset()
      this.$nextTick(() => this.initializeParams())
    },
    formatDate(text) {
      try {
        return format(new Date(text), 'yyyy-MM-dd')
      } catch {
        return text
      }
    }
  }
}
</script>
