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
  <li :class="{'topic-item': true, 'elevation-3 topic-item--sticky': topic.sticky}">
    <v-icon
      v-if='topic.sticky'
      large
      class='topic-item_sticky-icon'
    >
      star
    </v-icon>

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
    position: relative;
    display: flex;
    padding: 30px 30px;
    border-bottom: 1px solid #e0e0e0;
  }

  .topic-item--sticky {
    border-bottom: 0;
    margin-bottom: 20px;
  }

  .topic-item_sticky-icon {
    color: gold;
    position: absolute;
    top: 12px;
    left: 12px;
  }

  .topic-item_read-action {
    position: absolute;
    top: 0px;
    right: 16px;
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
