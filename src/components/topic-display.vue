<script>
  import { mapGetters, mapMutations } from 'vuex';
  import TopicList from '@/components/topic-list';

  export default {
    name: 'TopicDisplay',

    watch: {
      currentPage() {
        this.$vuetify.goTo('.topic-list_wrapper');
        this.$store.commit('updateViewingCard', null);
      }
    },

    components: {
      TopicList,
    },

    data() {
      return {
        sort: '0',
      }
    },

    computed: {
      ...mapGetters({
        stickies: 'stickiedTopics',
        fullList: 'nonStickiedTopic',
        getTopics: 'currentPageTopics',
        pagesCount: 'totalPages',
      }),

      currentPage() {
        return this.$store.state.page;
      },

      sortedTopicList() {
        return this.getTopics(this.sort);
      },
    },

    methods: {
      ...mapMutations([
        'updatePage'
      ]),

      updateSort(value) {
        this.sort = value;
        this.updatePage(1);
      },
    }
  }
</script>

<template>
  <div class='topic-display'>
    <topic-list
      :topics='stickies'
      :stickied='true'
      class='topic-list--sticky'
    />

    <div class='topic-list_wrapper'>
      <div class='topic-list_header'>
        <v-badge right>
          <span slot="badge">{{ fullList.length }}</span>
          Topics
        </v-badge>

        <v-tabs class='topic-list_sort' @input='updateSort'>
          <v-tab>Recent</v-tab>
          <v-tab>Popular</v-tab>
        </v-tabs>
      </div>

      <topic-list
        :topics='sortedTopicList'
        :stickied='false'
        class='topic-list--regular'
      />
    </div>

    <v-pagination
      :length="pagesCount"
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
    position: relative;
    font-size: 32px;
    font-weight: 400;
    padding: 8px 30px;
    border-bottom: 1px solid #e0e0e0;
  }

  .badge__badge {
    top: 0;
  }

  .topic-list_sort {
    position: absolute;
    bottom: 0px;
    right: 30px;
  }

  .pagination {
    margin: 30px;
    display: flex;
    justify-content: center;
  }
</style>
