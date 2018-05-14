<script>
  import { mapGetters } from 'vuex';
  import TopicList from '@/components/TopicList';

  export default {
    name: 'TopicDisplay',

    components: {
      TopicList,
    },

    computed: {
      ...mapGetters([
        'stickiedTopics',
        'nonStickiedTopic',
      ])
    }
  }
</script>

<template>
  <div>
    <h2>Topics</h2>

    <div class='topic-list topic-list--stickied'>
      <topic-list :topics='stickiedTopics'></topic-list>
    </div>

    <hr />

    <div class='topic-list topic-list--non-stickied'>
      <topic-list :topics='nonStickiedTopic'></topic-list>
    </div>
  </div>
</template>
