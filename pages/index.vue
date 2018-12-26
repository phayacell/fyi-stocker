<template lang="pug">
  section
    v-container
      contribute-form
    v-container
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
