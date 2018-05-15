import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from '@/data/userStore.js';
import { topicStore } from '@/data/topicStore.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,

  modules: {
    users: userStore,
    topics: topicStore,
  },

  state() {
    return {
      page: 1,
      perPage: 10,
      viewingCard: null,
    };
  },

  mutations: {
    updatePage(state, page) {
      state.page = page;
    },

    updateViewingCard(state, cardId) {
      if(state.viewingCard === cardId) {
        state.viewingCard = null;
      }
      else {
        state.viewingCard = cardId;
      }
    },
  },
});
