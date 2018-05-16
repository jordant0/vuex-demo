<script>
  import NewTopicModal from '@/components/new-topic-modal';

  export default {
    name: 'NewTopicButton',

    components: {
      NewTopicModal,
    },

    data() {
      return {
        modalShown: false,
      };
    },
  }
</script>

<template>
  <div class='new-topic-button_wrapper'>
    <v-btn
      color="orange"
      class='new-topic-button'
      dark
      absolute
      bottom
      right
      fab
      @click='modalShown = true'
    >
      <v-tooltip bottom class='current-user-marker'>
        <v-icon large slot="activator">add</v-icon>
        <span>New Topic</span>
      </v-tooltip>
    </v-btn>

    <new-topic-modal :shown.sync='modalShown' />
  </div>
</template>

<style scoped>
  .new-topic-button_wrapper {
    position: relative;
    width: 56px;
    height: 100%;
  }

  .new-topic-button .icon {
    line-height: 56px;
  }
</style>
