<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'TopicSort',

    methods: {
      ...mapMutations([
        'updateSort'
      ]),
    }
  }
</script>

<template>
  <v-tabs class='topic-list_sort' @input='updateSort'>
    <v-tab>Recent</v-tab>
    <v-tab>Popular</v-tab>
  </v-tabs>
</template>

<style scoped>

  .topic-list_sort {
    position: absolute;
    bottom: 0px;
    right: 30px;
  }
</style>
