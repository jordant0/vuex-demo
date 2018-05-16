import { topicStore } from '@/data/topic-store'

describe('topic store', () => {
  let state, topics;

  beforeEach(() => {
    topics = {
      1: {
        id: 1,
        subject: 'First Topic',
        points: 75,
        createdAt: `2018-05-12T00:00:00.000Z`,
        userScore: 1,
        sticky: false,
      },
      2: {
        id: 2,
        subject: 'Second Topic',
        points: 50,
        createdAt: `2018-05-24T00:00:00.000Z`,
        userScore: 0,
        sticky: true,
      },
      3: {
        id: 3,
        subject: 'Third Topic',
        points: 100,
        createdAt: `2018-05-06T00:00:00.000Z`,
        userScore: -1,
        sticky: false,
      }
    }

    state = {
      list: topics,
    };
  });

  describe('getters', () => {
    it('stickied topics', () => {
      const topicIds = topicStore.getters.stickiedTopics(state).map(topic => topic.id);

      expect(topicIds.length).toEqual(1);
      expect(topicIds).toContain(2);
    });

    it('non stickied topics', () => {
      const topicIds = topicStore.getters.nonStickiedTopic(state).map(topic => topic.id);

      expect(topicIds.length).toEqual(2);
      expect(topicIds).toContain(1);
      expect(topicIds).toContain(3);
    });

    it('total pages', () => {
      const rootState = { perPage: 10 },
            getters = { nonStickiedTopic: new Array(21) };

      expect(topicStore.getters.totalPages(state, getters, rootState)).toEqual(3);
    });

    describe('current page topics', () => {
      let rootState, getters, getTopics, topicIds;

      beforeEach(() => {
        rootState = { page: 1, perPage: 10 };
        getters = { nonStickiedTopic: Object.values(topics) };
      });

      it('get first page', () => {
        rootState.perPage = 2;
        getTopics = topicStore.getters.currentPageTopics(state, getters, rootState);
        topicIds = getTopics().map(topic => topic.id);

        expect(topicIds).toEqual([ 1, 2 ]);
      });

      it('get second page', () => {
        rootState.perPage = 2;
        rootState.page = 2;
        getTopics = topicStore.getters.currentPageTopics(state, getters, rootState);
        topicIds = getTopics().map(topic => topic.id);

        expect(topicIds).toEqual([ 3 ]);
      });

      it('sort by created time', () => {
        getTopics = topicStore.getters.currentPageTopics(state, getters, rootState);
        topicIds = getTopics('0').map(topic => topic.id);

        expect(topicIds).toEqual([ 2, 1, 3 ]);
      });

      it('sort by points', () => {
        getTopics = topicStore.getters.currentPageTopics(state, getters, rootState);
        topicIds = getTopics('1').map(topic => topic.id);

        expect(topicIds).toEqual([ 3, 1, 2 ]);
      });
    });
  });

  describe('mutations', () => {
    it('toggle sticky for stickied topic', () => {
      topicStore.mutations.toggleSticky(state, 2);
      expect(state.list[2].sticky).toEqual(false);
    });

    it('toggle sticky for non stickied topic', () => {
      topicStore.mutations.toggleSticky(state, 1);
      expect(state.list[1].sticky).toEqual(true);
    });

    it('add topic', () => {
      const newTopic = {
              id: 4,
              subject: 'New Topic',
            };

      topicStore.mutations.addTopic(state, newTopic);
      expect(state.list[4]).toBeTruthy();
      expect(state.list[4].id).toEqual(4);
      expect(state.list[4].subject).toEqual('New Topic');
    });

    describe('toggle user score', () => {
      it('changing from thumb up to thum down', () => {
        topicStore.mutations.toggleUserScore(state, { id: 1, points: -1 });
        expect(state.list[1].userScore).toEqual(-1);
        expect(state.list[1].points).toEqual(73);
      });

      it('changing from thumb down to thum up', () => {
        topicStore.mutations.toggleUserScore(state, { id: 3, points: 1 });
        expect(state.list[3].userScore).toEqual(1);
        expect(state.list[3].points).toEqual(102);
      });

      it('changing from neutral to thumb up', () => {
        topicStore.mutations.toggleUserScore(state, { id: 2, points: 1 });
        expect(state.list[2].userScore).toEqual(1);
        expect(state.list[2].points).toEqual(51);
      });

      it('changing from neutral to thumb down', () => {
        topicStore.mutations.toggleUserScore(state, { id: 2, points: -1 });
        expect(state.list[2].userScore).toEqual(-1);
        expect(state.list[2].points).toEqual(49);
      });

      it('undoing thumb up', () => {
        topicStore.mutations.toggleUserScore(state, { id: 1, points: 1 });
        expect(state.list[1].userScore).toEqual(0);
        expect(state.list[1].points).toEqual(74);
      });

      it('undoing thumb down', () => {
        topicStore.mutations.toggleUserScore(state, { id: 3, points: 0 });
        expect(state.list[3].userScore).toEqual(0);
        expect(state.list[3].points).toEqual(101);
      });
    });
  });

  describe('actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
      global.Api = {
        postNewTopic(data) {
          return new Promise((resolve, reject) => {
            if(data.valid) {
              resolve({ topic: data });
            }
            else {
              reject({ errors: data });
            }
          });
        }
      };
    });

    it('toggle follow success', () => {
      const topicData = { id: 12345, valid: true };

      expect.assertions(2);
      topicStore.actions.addTopic({ commit }, topicData)
      .then(
        (response) => {
          expect(commit).toHaveBeenCalledWith('addTopic', topicData);
          expect(response).toEqual({ topic: topicData });
        }
      );
    });

    it('toggle follow failure', () => {
      const topicData = { id: 12345, valid: false };

      expect.assertions(2);
      topicStore.actions.addTopic({ commit }, topicData)
      .then(null,
        (response) => {
          expect(commit).toHaveBeenCalledTimes(0);
          expect(response).toEqual({ errors: topicData });
        }
      );
    });
  });
});
