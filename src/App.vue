<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">

    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        right
        app
      >
      Do things
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

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false
  }),
}
</script>
