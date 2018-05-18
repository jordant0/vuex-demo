require('../test-config')
import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CurrentProfile from '@/components/current-profile'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('current profile', () => {
  it('renders correctly', () => {
    let getters, store, wrapper;

    getters = {
      currentUser() {
        return {
          avatar: '/assets/avatar.png',
          firstName: 'John',
          lastName: 'Doe',
          followers: 123,
        };
      },
    };

    store = new Vuex.Store({
      getters
    })

    wrapper = shallow(CurrentProfile, {
      store,
      localVue
    });

    expect(wrapper.find('.user-profile_avatar img').attributes().src).toEqual('/assets/avatar.png');
    expect(wrapper.find('.user-profile_avatar img').attributes().title).toEqual('John Doe');
    expect(wrapper.find('.user-profile_followers').text()).toEqual('123 Followers');
  });
});
