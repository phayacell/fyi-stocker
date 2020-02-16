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
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    contributes: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
