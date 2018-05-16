<script>
  import TopicDisplay from '@/components/topic-display';

  export default {
    name: 'Home',

    metaInfo: {
      title: 'Vuex Demo',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
        { rel: 'shortcut icon', type: 'image/png', href: '/static/favicon.png?v=5' },
      ]
    },

    components: {
      TopicDisplay,
    }
  }
</script>

<template>
  <div>
    <topic-display></topic-display>
  </div>
</template>
