<script>
  import { mapMutations } from 'vuex';
  import faker from 'faker';
  import UserFollow from '@/components/user-follow';
  import UserCard from '@/components/user-card';

  export default {
    name: 'UserItem',

    components: {
      UserFollow,
      UserCard,
    },

    props: {
      user: {
        type: Object,
        default() {
          return {};
        },
      },
    },

    data() {
      return {
        cardId: faker.random.number(10000),
      };
    },

    computed: {
      fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
      },
    },

    methods: {
      ...mapMutations([
        'updateViewingCard'
      ]),
    }
  }
</script>

<template>
  <div class='user-item'>
    <div class='user-item_info' @click='updateViewingCard(cardId)'>
      <v-avatar>
        <img :src="user.avatar" :title='fullName'>
      </v-avatar>

      <div class='user-item_real-name'>
        {{ fullName }}
      </div>

      <div class='user-item_user-name'>
        {{ user.userName }}
      </div>

      <user-card :user='user' :cardId='cardId'/>
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

  .user-item_info {
    position: relative;
  }

  .user-item_info:hover {
    cursor: pointer;
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
    margin-top: 12px;
  }

  .user-item .user-follow {
    margin-top: 4px;
  }
</style>
