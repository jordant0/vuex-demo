require('../test-config')
import { shallow } from '@vue/test-utils'
import ProfileEdit from '@/components/profile-edit'

describe('profile edit', () => {
  let $store, wrapper;

  beforeEach(() => {
    $store = {
      getters: {
        currentUser: {
          id: 4567,
          firstName: 'John',
          lastName: 'Doe'
        },
      },
      commit: jest.fn(),
    };

    wrapper = shallow(ProfileEdit, {
      mocks: {
        $store
      },
      propsData: {
        field: 'firstName',
        label: 'First Name',
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.attributes().class).toContain('user-profile_firstName');
    expect(wrapper.findAll('.stub-vuetify-icon').length).toEqual(0);
    expect(wrapper.find('.stub-vuetify-text-field').attributes().label).toEqual('First Name');

    wrapper.setProps({ icon: 'person' });
    expect(wrapper.find('.stub-vuetify-icon').text()).toEqual('person');
  });

  it('get user data', () => {
    expect(wrapper.vm.userData).toEqual('John');
    wrapper.setProps({ field: 'lastName' });
    expect(wrapper.vm.userData).toEqual('Doe');
  });

  it('set user data', () => {
    wrapper.vm.userData = 'Jane';
    expect($store.commit).toBeCalledWith('updateUserData', {
      userId: 4567,
      field: 'firstName',
      value: 'Jane',
    });

    wrapper.setProps({ field: 'lastName' });
    wrapper.vm.userData = 'Smith';
    expect($store.commit).toBeCalledWith('updateUserData', {
      userId: 4567,
      field: 'lastName',
      value: 'Smith',
    });
  });
});
