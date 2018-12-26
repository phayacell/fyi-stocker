<template lang="pug">
  div
    v-dialog(v-model="dialog" max-width="600px" persistent)
      contribute-form(v-if="editedContribute" :contribute="editedContribute" mode="edit" @close="updated")
    v-card
      v-card-title
        v-spacer
        v-text-field(v-model="search" append-icon="search" label="Search" single-line hide-details)
      v-data-table(:headers="headers" :items="contributes" :search="search" :loading="loading" :rows-per-page-items="rowsPerPageItems" disable-initial-sort)
        template(slot="items" slot-scope="props")
          tr(@click="edit(props.item)")
            td.text-no-wrap {{ props.item.at }}
            td.pl-0.py-2
              a(:href="props.item.url" target="_blank") {{ props.item.title }}
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
      headers: [
        { text: 'at', value: 'at' },
        { text: 'link', value: 'title', class: 'pl-0' }
      ],
      dialog: false,
      editedContribute: null,
      search: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('contributes', ['contributes', 'loading']),
    rowsPerPageItems: function() {
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
    ...mapActions('contributes', ['initialize', 'delete']),
    edit(contribute) {
      this.editedContribute = Object.assign({ id: contribute.id }, contribute)
      this.dialog = true
    },
    updated() {
      this.editedContribute = null
      this.dialog = false
    },
    remove(contribute) {
      confirm('Are you sure you want to delete this contribute?') &&
        this.delete(contribute)
    }
  }
}
</script>
