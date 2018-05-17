require('../test-config')
import { shallow } from '@vue/test-utils'
import NewTopicModal from '@/components/new-topic-modal'

describe('new topic modal', () => {
  let $store, wrapper;

  beforeEach(() => {
    $store = {
      state: {
        users: {
          currentUserId: 12345,
        },
      },
      getters: {
        currentUser: {
          avatar: '/assets/avatar.png',
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      dispatch: jest.fn(),
    };

    wrapper = shallow(NewTopicModal, {
      propsData: {
        shown: true,
      },
      mocks: {
        $store,
      },
    });
  });

  it('redners correctly', () => {
    expect(wrapper.find('.new-topic_author-avatar img').attributes().src).toEqual('/assets/avatar.png');
    expect(wrapper.find('.new-topic_author-avatar img').attributes().title).toEqual('John Doe');
    expect(wrapper.find('.new-topic_author-name').text()).toEqual('John Doe');
  });

  it('submit topic success', async () => {
    let newTopicData = {
      subject: 'This is a topic',
      post: 'Check out this cool text.',
      userId: 12345,
    }

    wrapper.setData({
      newTopic: newTopicData,
      errors: {
        subject: ['Can\'t be blank'],
        post: ['Can\'t be blank'],
      }
    });

    $store.dispatch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

    wrapper.vm.submitTopic();
    await flushPromises();

    expect($store.dispatch).toBeCalledWith('addTopic', newTopicData);
    expect(wrapper.vm.loading).toEqual(false);
    expect(wrapper.vm.errors.subject).toEqual([]);
    expect(wrapper.vm.errors.post).toEqual([]);
    expect(wrapper.vm.newTopic.subject).toEqual('');
    expect(wrapper.vm.newTopic.post).toEqual('');
    expect(wrapper.vm.newTopic.userId).toEqual(12345);
  });

  it('submit topic failure', async () => {
    let newTopicData = {
      subject: 'This is a topic',
      post: 'Check out this cool text.',
      userId: 12345,
    };

    wrapper.setData({
      newTopic: newTopicData,
      errors: {
        subject: ['Can\'t be blank'],
        post: ['Can\'t be blank'],
      }
    });

    $store.dispatch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject({
          errors: {
            subject: 'Must be at least 3 characters',
            post: 'Must be at least 10 characters'
          }
        });
      });
    });

    wrapper.vm.submitTopic();
    await flushPromises();

    expect($store.dispatch).toBeCalledWith('addTopic', newTopicData);
    expect(wrapper.vm.loading).toEqual(false);
    expect(wrapper.vm.errors.subject).toEqual('Must be at least 3 characters');
    expect(wrapper.vm.errors.post).toEqual('Must be at least 10 characters');
    expect(wrapper.vm.newTopic).toEqual(newTopicData);
  });
});
