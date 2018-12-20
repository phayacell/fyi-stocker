<template lang="pug">
  v-app
    v-menu
    v-toolbar(app dark color="primary")
      v-toolbar-title FYI Stocker
    v-content
      v-container
        v-fade-transition
          nuxt
    v-footer(app)
      v-spacer
      span &copy; 2018 hayato-yamashita
      v-spacer
    v-scroll-to-top
</template>

<script>
import Menu from '~/components/Menu'
import ScrollToTop from '~/components/ScrollToTop'

export default {
  components: {
    'v-scroll-to-top': ScrollToTop,
    'v-menu': Menu
  }
}
</script>
