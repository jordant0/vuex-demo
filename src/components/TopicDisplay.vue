<script>
  import { mapGetters, mapMutations } from 'vuex';
  import TopicList from '@/components/TopicList';

  export default {
    name: 'TopicDisplay',

    watch: {
      currentPage() {
        this.$vuetify.goTo('.topic-display');
      }
    },

    components: {
      TopicList,
    },

    computed: {
      ...mapGetters([
        'stickiedTopics',
        'nonStickiedTopic',
        'totalPages',
      ]),

      currentPage() {
        return this.$store.state.page;
      },
    },

    methods: {
      ...mapMutations([
        'updatePage'
      ]),
    }
  }
</script>

<template>
  <div class='topic-display'>
    <div class='topic-list-wrapper topic-list--stickied'>
      <topic-list :topics='stickiedTopics'></topic-list>
    </div>

    <div class='topic-list-wrapper topic-list--non-stickied'>
      <topic-list :topics='nonStickiedTopic'></topic-list>
    </div>

    <v-pagination
      :length="totalPages"
      :value="currentPage"
      @input='updatePage'
    />
  </div>
</template>
