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

    toggleSticky(state, id) {
      state.topics[id].sticky = !state.topics[id].sticky;
    },

    toggleUserScore(state, payload) {
      var topic = state.topics[payload.id];

      if(topic.userScore !== payload.points) {
        topic.points = topic.points - topic.userScore + payload.points;
        topic.userScore = payload.points;
      }
      else {
        topic.points -= topic.userScore;
        topic.userScore = 0;
      }
    },

    toggleFollow(state, id) {
      state.users[id].followed = !state.users[id].followed;
    },
  },
});
