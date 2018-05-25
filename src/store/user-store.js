import { users, currentUserId } from '@/api/data';

export const userStore = {
  state() {
    return {
      list: users,
      currentUserId: currentUserId,
    };
  },

  getters: {
    isCurrentUser: state => userId => {
      return state.currentUserId === userId;
    },

    currentUser: state => {
      return state.list[state.currentUserId];
    },

    followedUsers: state => {
      return Object.values(state.list).filter(user => user.followed);
    },
  },

  mutations: {
    updateUserData(state, payload) {
      var user = state.list[payload.userId];

      user[payload.field] = payload.value;
    },

    toggleFollow(state, payload) {
      var user = state.list[payload.userId],
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
  },

  actions: {
    toggleFollow({ commit, getters }, userId) {
      commit('toggleFollow', {
        userId: userId,
        currentUser: getters.currentUser,
      });
    },
  }
}
