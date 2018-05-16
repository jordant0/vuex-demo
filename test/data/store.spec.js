import { mutations } from '@/data/store'

describe('store', () => {
  let state;

  beforeEach(() => {
    state = {
      page: 1,
      viewingCard: 1234,
    };
  });

  describe('mutations', () => {
    it('update page', () => {
      mutations.updatePage(state, 2);

      expect(state.page).toEqual(2);
    });

    it('update viewing card to same card', () => {
      mutations.updateViewingCard(state, 1234);

      expect(state.viewingCard).toEqual(null);
    });

    it('update viewing card to another card', () => {
      mutations.updateViewingCard(state, 5678);

      expect(state.viewingCard).toEqual(5678);
    });
  });
});
