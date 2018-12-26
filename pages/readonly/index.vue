<template lang="pug">
  v-card
    v-card-title
      v-spacer
      .headline total {{ contributes.length }} contributes
      v-spacer
    v-progress-linear(v-if="loading" indeterminate)
    v-data-table(:items="contributes" hide-headers hide-actions disable-initial-sort)
      template(slot="items" slot-scope="props")
        td.text-no-wrap {{ props.item.at }}
        td.pl-0.py-2
          a(:href="props.item.url" target="_blank") {{ props.item.title }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  meta: {
    ignoreAuth: true
  },
  validate({ query }) {
    return query.uid && query.from && query.to
  },
  computed: {
    ...mapGetters('contributes', {
      originContributes: 'contributes',
      loading: 'loading'
    }),
    query: context => context.$route.query,
    from: context => new Date(context.query.from),
    to: context => new Date(context.query.to),
    contributes: context =>
      context.originContributes.filter(contribute => {
        const at = new Date(contribute.at)
        return context.from <= at && at <= context.to
      })
  },
  created() {
    this.initialize(this.query.uid)
  },
  methods: {
    ...mapActions('contributes', ['initialize'])
  }
}
</script>
