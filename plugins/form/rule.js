import Vue from 'vue'

const required = [v => !!v || 'Required field.']

Vue.prototype.$rules = { required }
