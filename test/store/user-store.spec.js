import { userStore } from '@/store/user-store'

describe('user store', () => {
  let state;

  beforeEach(() => {
    const users = {};

    for (var i = 1; i <= 4; ++i) {
      users[i] = {
        id: i,
        userName: `user${i}`,
        email: `email${i}@example.com`,
        followers: i + 2,
        following: i,
        followed: i == 1 || i == 3,
      };
    }

    state = {
      list: users,
      currentUserId: 2,
    };
  });

  describe('getters', () => {
    it('is current user', () => {
      const currentUserCheck = userStore.getters.isCurrentUser(state);

      expect(currentUserCheck(1)).toEqual(false);
      expect(currentUserCheck(2)).toEqual(true);
      expect(currentUserCheck(3)).toEqual(false);
    });

    it('current user', () => {
      const currentUser = userStore.getters.currentUser(state);

      expect(currentUser.userName).toEqual('user2');
      expect(currentUser.email).toEqual('email2@example.com');
    });

    it('followed users', () => {
      const followedIds = userStore.getters.followedUsers(state).map(user => user.id);

      expect(followedIds.length).toEqual(2);
      expect(followedIds).toContain(1);
      expect(followedIds).toContain(3);
    });
  });

  describe('mutations', () => {
    it('toggle follow for currently followed user', () => {
      userStore.mutations.toggleFollow(state, {
        userId: 1,
        currentUser: state.list[2],
      });

      expect(state.list[1].followed).toEqual(false);
      expect(state.list[1].followers).toEqual(2);
      expect(state.list[2].following).toEqual(1);
    });

    it('toggle follow for not followed user', () => {
      userStore.mutations.toggleFollow(state, {
        userId: 4,
        currentUser: state.list[2],
      });

      expect(state.list[4].followed).toEqual(true);
      expect(state.list[4].followers).toEqual(7);
      expect(state.list[2].following).toEqual(3);
    });

    it('update user data', () => {
      userStore.mutations.updateUserData(state, {
        userId: 2,
        field: 'userName',
        value: 'newUserName',
      });

      expect(state.list[2].userName).toEqual('newUserName');

      userStore.mutations.updateUserData(state, {
        userId: 2,
        field: 'email',
        value: 'new.email@example.com',
      });

      expect(state.list[2].email).toEqual('new.email@example.com');
    });
  });

  describe('actions', () => {
    it('toggle follow', () => {
      const commit = jest.fn(),
            currentUser = jest.fn(),
            getters = { currentUser: currentUser };

      userStore.actions.toggleFollow({ commit, getters }, 6);
      expect(commit).toHaveBeenCalledWith('toggleFollow', {
        userId: 6,
        currentUser: currentUser,
      });
    });
  });
});
