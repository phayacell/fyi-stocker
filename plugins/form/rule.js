import Vue from 'vue'

const required = [v => !!v || 'Required field.']

const dateRegex = RegExp(/^\d{4}-\d{2}-\d{2}/)
const dateFormat = [
  v => (v && dateRegex.test(v)) || 'Should be format to "yyyy-MM-dd".'
]

Vue.prototype.$rules = { required, dateFormat }
