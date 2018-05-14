import Vue from 'vue';
import Vuex from 'vuex';
import { topics, users } from '@/data/data.js';

Vue.use(Vuex);

function toDataObject(data) {
  var dataObj = {};
  for (var i = 0; i < data.length; ++i) {
    dataObj[data[i].id] = data[i];
  }
  return dataObj;
}

export const store = new Vuex.Store({
  state() {
    return {
      topics: toDataObject(topics),
      users: toDataObject(users),
      page: 1,
      perPage: 10,
    };
  },

  getters: {
    stickiedTopics: state => {
      return Object.values(state.topics).filter(topic => topic.sticky);
    },

    nonStickiedTopic: state => {
      var start = (state.page - 1) * state.perPage,
          end = start + state.perPage;
      return Object.values(state.topics).filter(topic => !topic.sticky).slice(start, end);
    },

    totalPages: state => {
      return Math.ceil(Object.values(state.topics).filter(topic => !topic.sticky).length / state.perPage);
    },
  },

  mutations: {
    updatePage(state, page) {
      state.page = page;
    },

    toggleSticky(state, topicId) {
      state.topics[topicId].sticky = !state.topics[topicId].sticky;
    },

    spiceUp(state, topicId) {
      state.topics[topicId].points++;
    },

    toggleFollow(state, userId) {
      state.users[userId].followed = !state.users[userId].followed;
    },
  },
});
