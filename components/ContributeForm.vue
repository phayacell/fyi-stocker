<template lang="pug">
  v-card
    v-form(v-if="contribute" ref="form" v-model="valid" @submit.prevent)
      v-card-text
        v-text-field(v-model="contribute.at" prepend-icon="calendar_today" label="AT" :rules="$rules.required" required :disabled="loading")
        v-text-field(v-model="contribute.url" prepend-icon="link" label="URL" :rules="$rules.required" required :disabled="loading" @paste="loadTitle" autofocus)
        v-text-field(v-model="contribute.title" prepend-icon="text_format" label="TITLE" :rules="$rules.required" required :disabled="loading")
      v-card-actions
        template(v-if="mode === 'create'")
          v-btn(type="submit" large color="primary" @click="add" :disabled="!valid || loading" :loading="loading") Stock
          v-btn(type="button" large color="accent" @click="clear" :disabled="loading" :loading="loading") Clear
        template(v-else)
          v-btn(type="submit" large color="primary" @click="update" :disabled="!valid || loading" :loading="loading") Submit
          v-spacer
          v-btn(type="button" large color="error" @click="remove" :disabled="loading" :loading="loading") Remove
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import format from 'date-fns/format'

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
      valid: true,
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  },
  created() {
    if (this.mode === 'create') {
      this.initializeContribute()
    }
  },
  methods: {
    ...mapActions('contributes', {
      addContribute: 'add',
      updateContribute: 'update',
      deleteContribute: 'delete'
    }),
    initializeContribute() {
      this.contribute.at = this.formatDate()
      this.contribute.url = ''
      this.contribute.title = ''
    },
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
    async remove() {
      if (!confirm('Are you sure you want to delete this contribute?')) {
        return false
      }

      await this.deleteContribute(this.contribute)
      this.$emit('close')
    },
    clear() {
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.initializeContribute()
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
      if (text) return format(new Date(text), 'yyyy-MM-dd')
      return format(new Date(), 'yyyy-MM-dd')
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
