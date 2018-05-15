<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'UserFollow',

    props: {
      user: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    methods: {
      ...mapMutations([
        'toggleFollow'
      ]),
    }
  }
</script>

<template>
  <div class='user-follow'>
    <v-tooltip v-if='user.followed' top>
      <v-btn slot="activator" color="success" small @click='toggleFollow(user.id)'>
        Followed
        <v-icon small>done</v-icon>
      </v-btn>
      <span>Unfollow</span>
    </v-tooltip>
    <v-btn v-else small @click='toggleFollow(user.id)'>
      Follow
    </v-btn>
  </div>
</template>
