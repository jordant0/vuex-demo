import Vue from 'vue';
import Vuex from 'vuex';
import { topics, users, currentUserId } from '@/data/data.js';

Vue.use(Vuex);

function toDataObject(data) {
  var dataObj = {};
  for (var i = 0; i < data.length; ++i) {
    dataObj[data[i].id] = data[i];
  }
  return dataObj;
}

export const store = new Vuex.Store({
  strict: true,

  state() {
    return {
      topics: toDataObject(topics),
      users: toDataObject(users),
      currentUserId: currentUserId,
      page: 1,
      perPage: 10,
      viewingCard: null,
    };
  },

  getters: {
    stickiedTopics: state => {
      return Object.values(state.topics).filter(topic => topic.sticky);
    },

    nonStickiedTopic: state => {
      return Object.values(state.topics).filter(topic => !topic.sticky);
    },

    totalPages: (state, getters) => {
      return Math.ceil(getters.nonStickiedTopic.length / state.perPage);
    },

    currentPageTopics: (state, getters) => sort => {
      var start = (state.page - 1) * state.perPage,
          end = start + state.perPage,
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

    isCurrentUser: state => userId => {
      return state.currentUserId === userId;
    },

    currentUser: state => {
      return state.users[state.currentUserId];
    },
  },

  mutations: {
    updatePage(state, page) {
      state.page = page;
    },

    updateSort(state, sort) {
      state.sort = sort;
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

    toggleFollow(state, payload) {
      var user = state.users[payload.userId],
          currentUser = payload.currentUser;

      user.followed = !user.followed;

      if(user.followed) {
        user.followers++;
        currentUser.following++;
      }
      else {
        user.followers--;
        currentUser.following--;
      }
    },

    updateUserData(state, payload) {
      var user = state.users[payload.userId];

      user[payload.field] = payload.value;
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

  actions: {
    toggleFollow({ commit, getters }, userId) {
      commit('toggleFollow', {
        userId: userId,
        currentUser: getters.currentUser,
      });
    },
  }
});
