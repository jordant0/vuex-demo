<script>
  import { mapActions } from 'vuex';
  import TopicListItem from '@/components/TopicListItem';

  export default {
    name: 'TopicList',

    components: {
      TopicListItem,
    },

    props: {
      topics: {
        type: Array,
        default() {
          return [];
        },
      }
    },

    methods: {
      ...mapActions([
        'makeSticky'
      ]),
    }
  }
</script>

<template>
  <ul>
    <topic-list-item
      v-for='(topic, index) in topics'
      :key='index'
      :topic='topic'
    />
  </ul>
</template>
