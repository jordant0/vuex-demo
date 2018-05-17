require('../test-config')
import { shallow } from '@vue/test-utils'
import CurrentProfile from '@/components/current-profile'

describe('current profile', () => {
  it('redners correctly', () => {
    let $store, wrapper;

    $store = {
      getters: {
        currentUser: {
          avatar: '/assets/avatar.png',
          firstName: 'John',
          lastName: 'Doe',
          followers: 123,
        }
      },
    };

    wrapper = shallow(CurrentProfile, {
      mocks: {
        $store
      },
    });

    expect(wrapper.find('.user-profile_avatar img').attributes().src).toEqual('/assets/avatar.png');
    expect(wrapper.find('.user-profile_avatar img').attributes().title).toEqual('John Doe');
    expect(wrapper.find('.user-profile_followers').text()).toEqual('123 Followers');
  });
});
