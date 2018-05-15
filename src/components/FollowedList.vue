<script>
  import { mapGetters } from 'vuex';
  import FollowedUser from '@/components/FollowedUser';

  export default {
    name: 'FollowedList',

    components: {
      FollowedUser,
    },

    computed: {
      ...mapGetters([
        'currentUser',
        'followedUsers',
      ]),
    }
  }
</script>

<template>
  <div class='followed-list'>
    <div class='followed-list_header'>
      <v-badge right>
        <span slot="badge">{{ currentUser.following }}</span>
        <span class='followed-list_header-text'>Users Followed</span>
      </v-badge>
    </div>

    <ul class='followed-list_users'>
      <followed-user
        v-for='(user, index) in followedUsers'
        :key='index'
        :user='user'
      />
    </ul>
  </div>
</template>

<style scoped>
  .followed-list {
    margin-top: 20px;
  }

  .followed-list_header {
    padding-bottom: 4px;
    border-bottom: 1px solid #e0e0e0;
  }

  .followed-list_header-text {
    font-size: 24px;
    margin-right: 4px;
  }

  .followed-list_users {
    margin: 20px 0;
  }
</style>
