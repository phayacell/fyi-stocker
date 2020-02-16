<template lang="pug">
  v-text-field(
    v-model="internalValue"
    type="date"
    prepend-icon="calendar_today"
    @blur="internalValue = $utils.formatDate(internalValue)"
    :label="label"
    :rules="rules"
    :readonly="readonly"
    :disabled="disabled"
    :autofocus="autofocus"
  )
</template>

<script>
export default {
  props: {
    value: { required: true }, // eslint-disable-line vue/require-prop-types
    label: {
      type: String,
      required: false,
      default: undefined
    },
    required: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    autofocus: { type: Boolean, required: false, default: false }
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(newValue) {
        if (this.value !== newValue) this.$emit('input', newValue)
      }
    },
    rules: context => {
      const dateRegex = RegExp(/^\d{4}-\d{2}-\d{2}/)
      const rules = [
        v => !v || dateRegex.test(v) || 'Should be format to "yyyy-MM-dd".'
      ]
      if (context.required) rules.unshift(context.$rules.required)
      return rules
    }
  }
}
</script>
