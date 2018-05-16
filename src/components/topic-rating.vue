<script>
  export default {
    name: 'TopicRating',

    props: {
      topic: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    methods: {
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
  <div class='topic-rating'>
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
  </div>
</template>

<style scoped>
  .topic-rating {
    font-weight: 600;
  }

  .topic-rating_action .icon {
    color: lightgray;
  }

  .topic-rating_action.topic-rating_action--up .icon {
    color: darkgreen;
  }

  .topic-rating_action.topic-rating_action--down .icon {
    color: darkred;
  }
</style>
