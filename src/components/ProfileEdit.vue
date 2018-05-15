<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ProfileEdit',

    props: {
      icon: {
        type: String,
        default: undefined,
      },

      field: {
        type: String,
        default: 'userName',
      },

      label: {
        type: String,
        default: 'User Name',
      },
    },

    computed: {
      ...mapGetters([
        'currentUser'
      ]),

      userData: {
        get() {
          return this.currentUser[this.field];
        },

        set(value) {
          this.$store.commit('updateUserData', {
            userId: this.currentUser.id,
            field: this.field,
            value: value,
          });
        },
      }
    },
  }
</script>

<template>
  <div :class='`user-profile_detail user-profile_${field}`'>
    <v-icon v-if='icon'>{{ icon }}</v-icon>
    <v-text-field v-model="userData" :label='label' />
  </div>
</template>

<style scoped>
  .user-profile_detail {
    display: flex;
    align-items: center;
  }

  .user-profile_detail .icon {
    margin-right: 12px;
  }
</style>

<style>
  .input-group__details {
    min-height: 16px;
  }
</style>
