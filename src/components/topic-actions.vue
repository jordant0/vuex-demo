<script>
  import { mapMutations } from 'vuex';
  import TopicRating from '@/components/topic-rating';

  export default {
    name: 'TopicActions',

    components: {
      TopicRating,
    },

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
    }
  }
</script>

<template>
  <div class='topic-item_actions'>
    <topic-rating :topic="topic" />

    <v-btn v-if='topic.sticky' @click='toggleSticky(topic.id)'>
      Unsticky
    </v-btn>
    <v-btn v-else color="primary" @click='toggleSticky(topic.id)'>
      Make Sticky
    </v-btn>
  </div>
</template>

<style scoped>
  .topic-item_actions {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
  }
</style>
