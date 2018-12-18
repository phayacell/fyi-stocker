<template lang="pug">
  v-card
    v-form(v-if="contribute" ref="form" v-model="valid" lazy-validation @submit.prevent)
      v-card-text
        v-text-field(v-model="contribute.at" prepend-icon="calendar_today" label="AT" :rules="rules" required :disabled="loading" autofocus)
        v-text-field(v-model="contribute.url" prepend-icon="link" label="URL" :rules="rules" required :disabled="loading" @paste="loadTitle")
        v-text-field(v-model="contribute.title" prepend-icon="text_format" label="TITLE" :rules="rules" required :disabled="loading")
      v-card-actions
        template(v-if="mode === 'create'")
          v-btn(type="submit" large color="primary" @click="add" :disabled="!valid || loading" :loading="loading") Stock
          v-btn(type="button" large color="accent" @click="clear" :disabled="loading") Clear
        template(v-else)
          v-btn(type="submit" large color="primary" @click="update" :disabled="!valid || loading" :loading="loading") Update
          v-btn(type="button" large color="accent" @click="$emit('close')" :disabled="loading") Cancel
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    contribute: {
      type: Object,
      default: function() {
        return {
          at: '',
          url: '',
          title: ''
        }
      }
    },
    mode: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {
      rules: [v => !!v || 'Required field.'],
      valid: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  },
  created() {
    if (this.mode === 'create') {
      this.contribute.at = this.formatDate()
    }
  },
  methods: {
    ...mapActions('contributes', {
      addContribute: 'add',
      updateContribute: 'update'
    }),
    add() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.addContribute({
        uid: this.currentUser.uid,
        contribute: this.convertContribute()
      })
      this.clear()
    },
    update() {
      if (!this.$refs.form.validate()) {
        return false
      }

      this.updateContribute(this.convertContribute())
      this.$emit('close')
    },
    clear() {
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.contribute.at = this.formatDate()
      })
    },
    convertContribute() {
      return Object.assign(this.contribute, {
        at: this.formatDate(this.contribute.at)
      })
    },
    async loadTitle(event) {
      const text = event.clipboardData.getData('text')

      if (this.isURL(text)) {
        this.loading = true
        fetch(`${process.env.GAS_WEB_URL}?url=` + encodeURIComponent(text))
          .then(response => {
            return response.ok ? response.json() : null
          })
          .then(response => {
            this.contribute.title = this.unescape(response.title)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    formatDate(text) {
      const date = text ? new Date(text) : new Date()

      return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
      ].join('-')
    },
    isURL(str) {
      const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
      return matcher.test(str)
    },
    unescape(text) {
      return text.replace(/&nbsp;/g, ' ')
    }
  }
}
</script>
