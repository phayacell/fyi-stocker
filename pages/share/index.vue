<template lang="pug">
  share-table(:contributes="contributes" :loading="loading")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShareTable from '~/components/ShareTable'

export default {
  meta: {
    ignoreAuth: true
  },
  validate({ query }) {
    return query.uid && query.from && query.to
  },
  components: {
    'share-table': ShareTable
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
