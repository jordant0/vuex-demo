<script>
  import { mapActions } from 'vuex';

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

    computed: {
      canFollow() {
        return !this.$store.getters.isCurrentUser(this.user.id);
      },
    },

    methods: {
      ...mapActions([
        'toggleFollow'
      ]),
    }
  }
</script>

<template>
  <div v-if='canFollow' class='user-follow'>
    <v-tooltip v-if='user.followed' bottom>
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
