<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'NewTopicModal',

    props: {
      shown: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        loading: false,
        showNotice: false,
        newTopic: {
          subject: '',
          post: '',
          userId: this.$store.state.users.currentUserId,
        },
        errors: {
          subject: [],
          post: [],
        },
      }
    },

    computed: {
      ...mapGetters([
        'currentUser'
      ]),

      authorName() {
        return `${this.currentUser.firstName} ${this.currentUser.lastName}`
      }
    },

    methods: {
      clearErrors() {
        this.errors = {
          subject: [],
          post: [],
        };
      },

      submitTopic() {
        this.clearErrors();
        this.loading = true;
        this.$store.dispatch('addTopic', this.newTopic)
        .then(
          this.successHandler,
          this.failureHandler,
        )
        .finally(() => {
          this.loading = false;
        });
      },

      successHandler() {
        this.$emit('update:shown', false);
        this.newTopic = {
          subject: '',
          post: '',
          userId: this.$store.state.users.currentUserId,
        };
        this.showNotice = true;
      },

      failureHandler(response) {
        this.errors = response.errors;
      },
    },
  }
</script>

<template>
  <div>
    <v-snackbar
      :timeout="3000"
      top
      color="green"
      :value="showNotice"
    >
      Topic submit success
      <v-btn flat @click.native="showNotice = false">Close</v-btn>
    </v-snackbar>

    <v-dialog
      :value='shown'
      max-width="800px"
      @input="$emit('update:shown', $event)"
    >
      <v-card>
        <v-card-title class='new-topic_header'>
          <div class='new-topic_title'>
            Add New Topic
          </div>

          <div class='new-topic_author'>
            Posting as
            <v-avatar class='new-topic_author-avatar' size='24'>
              <img :src="currentUser.avatar" :title='authorName'>
            </v-avatar>

            <span class='new-topic_author-name'>{{ authorName }}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newTopic.subject"
              name="subject"
              label="Subject"
              :error-messages='errors.subject'
            />

            <v-text-field
              v-model="newTopic.post"
              name="post"
              label="Post Content"
              textarea
              :error-messages='errors.post'
            />
          </v-form>
        </v-card-text>

        <v-card-actions class='new-topic_actions'>
          <v-btn flat @click="$emit('update:shown', false)">
            Cancel
          </v-btn>

          <v-btn color="primary" large :loading="loading" @click='submitTopic'>
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
  .new-topic_header,
  .new-topic_actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .new-topic_title {
    font-size: 20px;
  }

  .new-topic_author {
    font-size: 16px;
    font-style: italic;
  }

  .new-topic_author-avatar {
    margin: 0 4px;
  }

  .new-topic_author-name {
    font-weight: 600;
    font-style: normal;
  }
</style>
