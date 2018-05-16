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
});
