import Vue from 'vue'
import format from 'date-fns/format'

const formatDate = dateOrText => {
  try {
    const date =
      typeof dateOrText === 'string' ? new Date(dateOrText) : dateOrText
    return format(date, 'yyyy-MM-dd')
  } catch {
    return dateOrText
  }
}

Vue.prototype.$utils = { formatDate }
