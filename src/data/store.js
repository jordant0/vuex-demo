import Vue from 'vue';
import Vuex from 'vuex';
import { topics } from '@/data/topics.js';
import { users } from '@/data/users.js';

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
    };
  },

  getters: {
    stickiedTopics: state => {
      return Object.values(state.topics).filter(topic => topic.sticky);
    },

    nonStickiedTopic: state => {
      return Object.values(state.topics).filter(topic => !topic.sticky);
    },
  },

  mutations: {
    toggleSticky(state, topicId) {
      state.topics[topicId].sticky = !state.topics[topicId].sticky;
    },

    spiceUp(state, index) {
      state.topics[topicId].points++;
    },
  },
});
