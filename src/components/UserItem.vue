<script>
  import UserFollow from '@/components/UserFollow';

  export default {
    name: 'UserItem',

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
  <div class='user-item'>
    <div class='user-item_info'>
      <v-avatar>
        <img :src="user.avatar" :title='fullName'>
      </v-avatar>

      <div class='user-item_real-name'>
        {{ fullName }}
      </div>

      <div class='user-item_user-name'>
        {{ user.userName }}
      </div>
    </div>

    <div class='user-item_actions'>
      <div class='user-item_followers'>
        {{ user.followers }} Followers
      </div>

      <user-follow :user='user' />
    </div>
  </div>
</template>

<style scoped>
  .user-item {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .user-item_real-name {
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
  }

  .user-item_user-name,
  .user-item_followers {
    color: #bdbdbd;
  }

  .user-item_followers {
    margin: 12px 0;
  }
</style>
