<script>
  import TopicListItem from '@/components/topic-list-item';

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
  }
</script>

<template>
  <ul v-if='topics.length' class='topic-list'>
    <topic-list-item
      v-for='(topic, index) in topics'
      :key='index'
      :topic='topic'
    />
  </ul>
</template>
