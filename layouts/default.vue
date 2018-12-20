<template lang="pug">
  v-app
    v-bottom-menu
    v-toolbar(app dark flat color="primary")
      nuxt-link.d-flex(to="/")
        img(src="/logo.svg" alt="logo" height="38px" width="38px" aria-hidden="true")
      v-toolbar-title FYI Stocker
    v-content
      v-container
        v-fade-transition
          nuxt
    v-footer
      v-spacer
      span &copy; 2018 hayato-yamashita
      v-spacer
    v-scroll-to-top
</template>

<script>
import BottomMenu from '~/components/BottomMenu'
import ScrollToTop from '~/components/ScrollToTop'

export default {
  components: {
    'v-scroll-to-top': ScrollToTop,
    'v-bottom-menu': BottomMenu
  }
}
</script>
