import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.base,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.cyan.base,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.lightBlue.lighten1
  }
})
