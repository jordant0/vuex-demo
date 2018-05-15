<script>
  import { mapGetters, mapMutations } from 'vuex';
  import TopicList from '@/components/TopicList';

  export default {
    name: 'TopicDisplay',

    watch: {
      currentPage() {
        this.$vuetify.goTo('.topic-list--regular');
      }
    },

    components: {
      TopicList,
    },

    computed: {
      ...mapGetters([
        'stickiedTopics',
        'nonStickiedTopic',
        'currentPageTopics',
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
    <topic-list
      :topics='stickiedTopics'
      :stickied='true'
      class='topic-list--sticky'
    />

    <h2 class='topic-list_header'>
      <v-badge right>
        <span slot="badge">{{ nonStickiedTopic.length }}</span>
        Topics
      </v-badge>
    </h2>

    <topic-list
      :topics='currentPageTopics'
      :stickied='false'
      class='topic-list--regular'
    />

    <v-pagination
      :length="totalPages"
      :value="currentPage"
      @input='updatePage'
    />
  </div>
</template>

<style scope>
  .topic-display {
    margin: 0 30px;
  }

  .topic-list_header {
    font-size: 32px;
    font-weight: 400;
    padding: 8px 30px;
    border-bottom: 1px solid #e0e0e0;
  }

  .badge__badge {
    top: 0;
  }

  .pagination {
    margin: 30px;
    display: flex;
    justify-content: center;
  }
</style>
