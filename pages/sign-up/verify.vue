<template lang="pug">
  v-content
    v-container(grid-list-xl)
      v-layout(row wrap justify-center)
        v-flex(xs12 sm8)
          v-card.elevation-1
            v-toolbar(dark color="primary")
              v-toolbar-title Verify your email
            v-card-text
              .subheading Account registration has not completed yet.
              .subheading Please access the authentication link in the confirmation email sent and complete the authentication.
</template>
