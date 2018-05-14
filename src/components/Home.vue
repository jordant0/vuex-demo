<script>
  import { store } from '@/data/store';
  import TopicDisplay from '@/components/TopicDisplay';

  export default {
    name: 'Home',

    store,

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
