<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'TopicList',

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
        'toggleSticky'
      ]),
    }
  }
</script>

<template>
  <li class='topic-item'>
    <div class='topic-item_subject'>
      {{ topic.subject }}
    </div>
    <div class='topic-item_post'>
      {{ topic.post }}
    </div>
    <div class='topic-item_actions'>
      <v-btn v-if='topic.sticky' @click='toggleSticky(topic.id)'>
        Unsticky
      </v-btn>
      <v-btn v-else color="primary" @click='toggleSticky(topic.id)'>
        Make Sticky
      </v-btn>
    </div>
  </li>
</template>
