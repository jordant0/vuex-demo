<script>
  import { store } from '@/store/store';
  import Sidebar from '@/components/sidebar';
  import NewTopicButton from '@/components/new-topic-button';

  export default {
    name: 'App',

    store,

    components: {
      Sidebar,
      NewTopicButton,
    },

    data: () => ({
      drawer: false
    }),
  }
</script>

<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        width='400'
        fixed
        right
        app
      >
        <sidebar />
      </v-navigation-drawer>

      <v-toolbar dark fixed app>
        <v-toolbar-title>Vuex Demo</v-toolbar-title>

        <v-spacer></v-spacer>

        <new-topic-button />

        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon medium>people</v-icon>
        </v-btn>
      </v-toolbar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>


<style>
  .container {
    background-color: white;
  }

  ul {
    list-style-type: none;
  }
</style>
