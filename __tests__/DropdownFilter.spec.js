import { shallowMount } from '@vue/test-utils'
import DropdownFilter from '../src/DropdownFilter.vue'

describe('DropdownFilter', () => {
  it('renders label', () => {
    const wrapper = shallowMount(DropdownFilter, {
      propsData: {
        key: 'test',
        label: 'Test Filter',
        selectedFilters: [],
        directOptions: []
      }
    })
    expect(wrapper.text()).toContain('Test Filter')
  })
})
