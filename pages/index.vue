<template lang="pug">
  section.container
    v-container(fluid grid-list-lg)
      contribute-form
    v-container(fluid grid-list-lg)
      contribute-table
</template>

<script>
import ContributeForm from '~/components/ContributeForm'
import ContributeTable from '~/components/ContributeTable'

export default {
  components: {
    'contribute-form': ContributeForm,
    'contribute-table': ContributeTable
  }
}
</script>
