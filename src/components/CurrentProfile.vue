<script>
  import { mapGetters } from 'vuex';
  import CurrentUserMarker from '@/components/CurrentUserMarker';
  import ProfileEdit from '@/components/ProfileEdit';

  export default {
    name: 'CurrentProfile',

    components: {
      CurrentUserMarker,
      ProfileEdit,
    },

    computed: {
      ...mapGetters([
        'currentUser'
      ]),
    },
  }
</script>

<template>
  <div class='user-profile'>
    <current-user-marker v-if='currentUser' large left class='user-profile_marker'>
      Your Profile
    </current-user-marker>

    <div class='user-profile_top'>
      <v-avatar size='100' class='user-profile_avatar'>
        <img :src="currentUser.avatar" :title='`${currentUser.firstName} ${currentUser.lastName}`'>
      </v-avatar>

      <div class='user-profile_real-name'>
        <profile-edit field='firstName' label='First Name' />

        <profile-edit field='lastName' label='Last Name' />
      </div>
    </div>

    <v-form class='user-profile_details'>
      <profile-edit icon='person' field='userName' label='User Name' />

      <profile-edit icon='business_center' field='title' label='Title' />

      <profile-edit icon='business' field='company' label='Company' />

      <profile-edit icon='email' field='email' label='Email' />
    </v-form>
  </div>
</template>

<style scoped>
  .user-profile_top {
    display: flex;
    align-items: center;
  }

  .user-profile_marker {
    position: absolute;
    top: 12px;
    right: 16px;
  }

  .user-profile_avatar {
    margin-right: 20px;
  }

  .user-profile_real-name {
    font-size: 30px;
  }

  .user-profile_details {
    margin-top: 20px;
    font-size: 16px;
  }
</style>
