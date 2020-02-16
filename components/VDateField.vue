<template lang="pug">
  v-text-field(
    v-model="internalValue"
    prepend-icon="calendar_today"
    @blur="internalValue = $utils.formatDate(internalValue)"
    :label="label"
    :hint="hint"
    :rules="rules"
    :disabled="disabled"
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
    required: {
      type: String,
      required: false,
      default: undefined
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
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
    isRequired: context => typeof context.required !== 'undefined',
    hint: context => 'Format to "yyyy-MM-dd".',
    rules: context => {
      const dateRegex = RegExp(/^\d{4}-\d{2}-\d{2}/)
      const rules = [
        v => !v || dateRegex.test(v) || 'Should be format to "yyyy-MM-dd".'
      ]
      if (context.isRequired) rules.unshift(context.$rules.required)
      return rules
    }
  }
}
</script>
