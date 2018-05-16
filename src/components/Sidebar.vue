<script>
  import CurrentProfile from '@/components/current-profile';
  import FollowedList from '@/components/followed-list';

  export default {
    name: 'Sidebar',

    components: {
      CurrentProfile,
      FollowedList,
    },
  }
</script>

<template>
  <div class='sidebar'>
    <current-profile />

    <followed-list />
  </div>
</template>

<style scoped>
  .sidebar {
    padding: 20px 30px;
  }
</style>
