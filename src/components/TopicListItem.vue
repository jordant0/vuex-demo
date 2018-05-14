<script>
  import TopicActions from '@/components/TopicActions';
  import UserItem from '@/components/UserItem';

  export default {
    name: 'TopicList',

    components: {
      UserItem,
      TopicActions,
    },

    props: {
      topic: {
        type: Object,
        default() {
          return {};
        },
      }
    },

    computed: {
      author() {
        return this.$store.state.users[this.topic.userId];
      },

      timestamp() {
        return (new Date(this.topic.createdAt)).toLocaleString();
      },
    },
  }
</script>

<template>
  <li class='topic-item'>
    <div class='topic-item_author'>
      <user-item :user='author' />
    </div>

    <div class='topic-item_content'>
      <div class='topic-item_subject'>
        {{ topic.subject }}
      </div>

      <div class='topic-item_timestamp'>
        Posted {{ timestamp }}
      </div>

      <div class='topic-item_post'>
        {{ topic.post }}
      </div>

      <topic-actions :topic='topic' />
    </div>
  </li>
</template>

<style scoped>
  .topic-item {
    display: flex;
  }

  .topic-item_author {
    width: 150px;
    margin-right: 50px;
    flex-shrink: 0;
  }

  .topic-item_subject {
    font-size: 18px;
    font-weight: 600;
  }

  .topic-item_timestamp {
    color: #bdbdbd;
    margin-bottom: 16px;
  }
</style>
