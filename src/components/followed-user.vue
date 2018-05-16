<script>
  import UserFollow from '@/components/user-follow';

  export default {
    name: 'FollowedUser',

    components: {
      UserFollow,
    },

    props: {
      user: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    computed: {
      fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
      },
    },
  }
</script>

<template>
  <li class='followed-user'>
    <div class='followed-user_info'>
      <v-avatar class='followed-user_avatar'>
        <img :src="user.avatar" :title='fullName'>
      </v-avatar>

      <div class='followed-user_names'>
        <div class='followed-user_real-name'>
          {{ fullName }}
        </div>

        <div class='followed-user_user-name'>
          {{ user.userName }}
        </div>
      </div>
    </div>

    <user-follow :user='user' />
  </li>
</template>

<style scoped>
  .followed-user,
  .followed-user_info {
    display: flex;
    align-items: center;
  }

  .followed-user {
    justify-content: space-between;
    padding: 8px 0;
  }

  .followed-user_avatar {
    margin-right: 12px;
  }

  .followed-user_real-name {
    font-size: 16px;
    font-weight: 600;
  }

  .followed-user_user-name {
    color: #bdbdbd;
  }
</style>
