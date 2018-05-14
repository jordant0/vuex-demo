<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'TopicActions',

    props: {
      topic: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    methods: {
      ...mapMutations([
        'toggleSticky',
      ]),

      thumpUp() {
        this.$store.commit('toggleUserScore', { id: this.topic.id, points: 1 });
      },

      thumpDown() {
        this.$store.commit('toggleUserScore', { id: this.topic.id, points: -1 });
      },
    }
  }
</script>

<template>
  <div class='topic-item_actions'>
    <v-btn
      icon
      :class="{'topic-rating_action': true, 'topic-rating_action--up': topic.userScore > 0}"
      @click='thumpUp'
    >
      <v-icon medium>thumb_up</v-icon>
    </v-btn>

    {{ topic.points }}

    <v-btn
      icon
      :class="{'topic-rating_action': true, 'topic-rating_action--down': topic.userScore < 0}"
      @click='thumpDown'
    >
      <v-icon medium>thumb_down</v-icon>
    </v-btn>

    <v-btn v-if='topic.sticky' @click='toggleSticky(topic.id)'>
      Unsticky
    </v-btn>
    <v-btn v-else color="primary" @click='toggleSticky(topic.id)'>
      Make Sticky
    </v-btn>
  </div>
</template>

<style scoped>
  .topic-rating_action .icon {
    color: lightgray;
  }

  .topic-rating_action.topic-rating_action--up .icon {
    color: green;
  }

  .topic-rating_action.topic-rating_action--down .icon {
    color: red;
  }
</style>
