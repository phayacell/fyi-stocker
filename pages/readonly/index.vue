<template lang="pug">
  section.container
    v-container(fluid grid-list-lg)
      v-card
        v-card-title
          v-spacer
          .headline total {{ contributes.length }} contributes
          v-spacer
        v-progress-linear(v-if="loading" indeterminate)
        v-data-table(:items="contributes" hide-headers hide-actions disable-initial-sort)
          template(slot="items" slot-scope="props")
            td.text-no-wrap {{ props.item.at }}
            td
              a(:href="props.item.url" target="_blank") {{ props.item.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  validate({ query }) {
    return query.uid && query.from && query.to
  },
  computed: {
    ...mapGetters('contributes', {
      origins: 'contributes',
      loading: 'loading'
    }),
    query: function() {
      return this.$route.query
    },
    from: function() {
      return new Date(this.query.from)
    },
    to: function() {
      return new Date(this.query.to)
    },
    contributes: function() {
      return this.origins.filter(contribute => {
        const at = new Date(contribute.at)
        return this.from <= at && at <= this.to
      })
    }
  },
  created() {
    this.initialize(this.query.uid)
  },
  methods: {
    ...mapActions('contributes', ['initialize'])
  }
}
</script>
