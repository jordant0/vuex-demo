import Vue from 'vue';
import { topics } from '@/data/data.js';
import { api } from '@/data/api.js';

export const topicStore = {
  state() {
    return {
      list: topics,
    };
  },

  getters: {
    stickiedTopics: state => {
      return Object.values(state.list).filter(topic => topic.sticky);
    },

    nonStickiedTopic: state => {
      return Object.values(state.list).filter(topic => !topic.sticky);
    },

    totalPages: (state, getters, rootState) => {
      return Math.ceil(getters.nonStickiedTopic.length / rootState.perPage);
    },

    currentPageTopics: (state, getters, rootState) => sort => {
      var start = (rootState.page - 1) * rootState.perPage,
          end = start + rootState.perPage,
          topics = getters.nonStickiedTopic;

      topics = topics.sort((topicA, topicB) => {
        if(sort === '0') {
          return new Date(topicB.createdAt) - new Date(topicA.createdAt);
        }
        else {
          return topicB.points - topicA.points;
        }
      });

      return topics.slice(start, end);
    },
  },

  mutations: {
    toggleSticky(state, id) {
      state.list[id].sticky = !state.list[id].sticky;
    },

    toggleUserScore(state, payload) {
      var topic = state.list[payload.id];

      if(topic.userScore !== payload.points) {
        topic.points = topic.points - topic.userScore + payload.points;
        topic.userScore = payload.points;
      }
      else {
        topic.points -= topic.userScore;
        topic.userScore = 0;
      }
    },

    addTopic(state, newTopic) {
      Vue.set(state.list, newTopic.id, newTopic);
    },
  },

  actions: {
    addTopic({ commit }, topicData) {
      return new Promise((resolve, reject) => {
        api.postNewTopic(topicData)
        .then(
          response => {  // success
            commit('addTopic', response.topic);
            resolve(response);
          },
          response => {  // failure
            reject(response);
          }
        );
      });
    },
  },
}
