<template lang="pug">
  div
    v-bottom-sheet(v-model="sheet")
      v-card
        v-toolbar(dark color="primary")
          v-btn(icon dark @click="close")
            v-icon close
          v-toolbar-title Edit / Remove
        contribute-form.pa-3(v-if="editedContribute" :contribute="editedContribute" mode="edit" @close="close")
    v-card
      v-card-title
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="Search" single-line hide-details)
      v-data-table(:headers="headers" :items="contributes" :search="search" :loading="loading" :rows-per-page-items="rowsPerPageItems" disable-initial-sort)
        template(slot="items" slot-scope="props")
          tr(@click="edit(props.item)")
            td.text-no-wrap {{ props.item.at }}
            td.pl-0.py-2
              a(:href="props.item.url" target="_blank" @click.stop) {{ props.item.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ContributeForm from '~/components/ContributeForm'

export default {
  components: {
    'contribute-form': ContributeForm
  },
  data() {
    return {
      sheet: false,
      editedContribute: null,
      search: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('contributes', ['contributes', 'loading']),
    headers() {
      return [
        { text: 'at', value: 'at' },
        { text: 'link', value: 'title', class: 'pl-0' }
      ]
    },
    rowsPerPageItems() {
      return [
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]
    }
  },
  created() {
    this.initialize(this.currentUser.uid)
  },
  methods: {
    ...mapActions('contributes', ['initialize']),
    edit(contribute) {
      this.editedContribute = Object.assign({ id: contribute.id }, contribute)
      this.sheet = true
    },
    close() {
      this.editedContribute = null
      this.sheet = false
    }
  }
}
</script>
