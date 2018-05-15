<script>
  export default {
    name: 'CurrentUserMarker',

    props: {
      large: {
        type: Boolean,
        default: false
      },
    }
  }
</script>

<template>
  <v-tooltip top class='current-user-marker'>
    <v-icon
      slot="activator"
      class='current-user-marker_icon'
      :large='large'
    >
      bookmark
    </v-icon>

    <span><slot /></span>
  </v-tooltip>
</template>

<style scoped>
  .current-user-marker_icon {
    color: #4CAF50;
  }
</style>
