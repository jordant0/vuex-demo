require('@/scripts/api')

import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import 'vuetify/dist/vuetify.min.css'
import Home from '@/components/home'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Vuex Demo',
      }
    }
  ]
})
