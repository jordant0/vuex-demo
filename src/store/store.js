import Vue from 'vue';
import Vuex from 'vuex';
import { userStore } from '@/store/user-store';
import { topicStore } from '@/store/topic-store';

Vue.use(Vuex);

export const mutations = {
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
};

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

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

  mutations: mutations,
});
