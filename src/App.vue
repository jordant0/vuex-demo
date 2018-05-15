<script>
  import { store } from '@/data/store';
  import Sidebar from '@/components/Sidebar';

  export default {
    name: 'App',

    store,

    components: {
      Sidebar,
    },

    data: () => ({
      drawer: false
    }),
  }
</script>

<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">

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
</style>
