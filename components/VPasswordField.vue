<template lang="pug">
  v-text-field(
    v-model="internalValue"
    prepend-icon="lock"
    :type="show ? 'text' : 'password'"
    :append-icon="show ? 'visibility_off' : 'visibility'"
    @click:append="show = !show"
    :hint="hint"
    :label="label"
    :rules="rules"
  )
</template>

<script>
export default {
  props: {
    value: { required: true }, // eslint-disable-line vue/require-prop-types
    confirm: {
      type: String,
      required: false,
      default: undefined
    },
    label: {
      type: String,
      required: false,
      default: undefined
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(newValue) {
        if (this.value !== newValue) {
          this.$emit('input', newValue)
        }
      }
    },
    isConfirm: context => typeof context.confirm !== 'undefined',
    hint: context =>
      context.isConfirm
        ? 'At least 6 characters and match to password.'
        : 'At least 6 characters.',
    rules(context) {
      const rules = context.$rules.required.concat([
        v => (v && v.length >= 6) || 'Password should be at least 6 characters.'
      ])

      return context.isConfirm
        ? rules.concat([
            v => (v && v === context.confirm) || 'Password do not match.'
          ])
        : rules
    }
  }
}
</script>
