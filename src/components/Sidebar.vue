<script>
  import CurrentProfile from '@/components/CurrentProfile';

  export default {
    name: 'Sidebar',

    components: {
      CurrentProfile,
    },
  }
</script>

<template>
  <div class='sidebar'>
    <current-profile />
  </div>
</template>

<style scoped>
  .sidebar {
    padding: 20px 30px;
  }
</style>
