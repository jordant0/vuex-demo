<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'UserItem',

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

    methods: {
      ...mapMutations([
        'toggleFollow'
      ]),
    }
  }
</script>

<template>
  <div class='user-item'>
    <v-avatar>
      <img :src="user.avatar" :title='fullName'>
    </v-avatar>

    <div class='user-item_real-name'>
      {{ fullName }}
    </div>

    <div class='user-item_user-name'>
      {{ user.userName }}
    </div>

    <div class='user-item_actions'>
      <v-tooltip v-if='user.followed' top>
        <v-btn slot="activator" color="success" small @click='toggleFollow'>
          Followed
          <v-icon small>done</v-icon>
        </v-btn>
        <span>Unfollow</span>
      </v-tooltip>
      <v-btn v-else small @click='toggleFollow(user.id)'>
        Follow
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
  .user-item {
    text-align: center;
  }

  .user-item_real-name {
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
  }

  .user-item_user-name {
    color: #bdbdbd;
  }
</style>
