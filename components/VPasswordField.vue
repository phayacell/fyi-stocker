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
    hint: function() {
      return typeof this.confirm === 'undefined'
        ? 'At least 6 characters.'
        : 'At least 6 characters and match to password.'
    },
    rules: function() {
      const rules = this.$rules.required.concat([
        v => (v && v.length >= 6) || 'Password should be at least 6 characters.'
      ])

      return typeof this.confirm === 'undefined'
        ? rules
        : rules.concat([
            v => (v && v === this.confirm) || 'Password do not match.'
          ])
    }
  }
}
</script>
