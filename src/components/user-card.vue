<script>
  import CurrentUserMarker from '@/components/current-user-marker';
  import UserFollow from '@/components/user-follow';

  export default {
    name: 'UserCard',

    components: {
      UserFollow,
      CurrentUserMarker,
    },

    props: {
      user: {
        type: Object,
        default() {
          return {};
        },
      },
      cardId: {
        type: Number,
        default: '',
      },
    },

    computed: {
      showCard() {
        return this.$store.state.viewingCard === this.cardId;
      },

      fullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
      },

      currentUser() {
        return this.$store.getters.isCurrentUser(this.user.id);
      },
    },
  }
</script>

<template>
  <transition name="fade">
    <div v-if='showCard' class='user-card elevation-5'>
      <current-user-marker v-if='currentUser' class='user-card--current-user'>
        Your Profile
      </current-user-marker>

      <div class='user-card_header'>
        <v-avatar size='80'>
          <img :src="user.avatar" :title='fullName'>
        </v-avatar>

        <div class='user-card_names'>
          <div class='user-card_real-name'>
            {{ fullName }}
          </div>

          <div class='user-card_user-name'>
            <v-icon small>person</v-icon> {{ user.userName }}
          </div>
        </div>
      </div>

      <div class='user-card_info'>
        <div class='user-card_detail user-card_title'>
          <v-icon>business_center</v-icon> {{ user.title }}
        </div>

        <div class='user-card_detail user-card_company'>
          <v-icon>business</v-icon> {{ user.company }}
        </div>

        <div class='user-card_detail user-card_email'>
          <v-icon>email</v-icon> {{ user.email }}
        </div>
      </div>

      <div class='user-card_actions'>
        <div class='user-card_followers'>
          {{ user.followers }} Followers
        </div>

        <user-follow :user='user' />
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .user-card {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 332px;
    background-color: white;
    padding: 20px;
    z-index: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .user-card_header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .user-card_names {
    margin-left: 20px;
    text-align: left;
  }

  .user-card_real-name {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .user-card_real-name {
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
  }

  .user-card_user-name {
    display: flex;
    align-items: center;
  }

  .user-card_user-name .icon {
    margin-right: 4px;
    margin-bottom: 2px;
  }

  .user-card_detail {
    display: flex;
    align-items: center;
    padding: 4px 12px;
  }

  .user-card_detail .icon {
    margin-right: 8px;
    margin-bottom: 4px;
  }

  .user-card_user-name,
  .user-card_followers {
    color: #bdbdbd;
  }

  .user-card_actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .user-card--current-user {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
