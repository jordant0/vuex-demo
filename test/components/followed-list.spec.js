require('../test-config')
import { shallow } from '@vue/test-utils'
import FollowedList from '@/components/followed-list'

describe('current profile', () => {
  it('redners correctly', () => {
    let $store, wrapper;

    $store = {
      getters: {
        currentUser: {
          following: 3,
        },
        followedUsers: new Array(3),
      },
    };

    wrapper = shallow(FollowedList, {
      mocks: {
        $store
      },
      stubs: {
        'followed-user': '<div class="stubbed-component"></div>',
      }
    });

    expect(wrapper.find('.followed-list_header').text()).toEqual('3 Users Followed');
    expect(wrapper.findAll('.stubbed-component').length).toEqual(3);
  });
});
