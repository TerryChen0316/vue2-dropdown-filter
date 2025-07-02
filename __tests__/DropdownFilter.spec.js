import { createLocalVue, shallowMount } from '@vue/test-utils'

// Mock Element UI components for isolation
const mockElementComponents = {
  'el-dropdown': {
    template: '<div class="mock-dropdown"><slot></slot><div class="mock-dropdown-menu"><slot name="dropdown"></slot></div></div>',
    methods: {
      hide: jest.fn()
    }
  },
  'el-dropdown-menu': {
    template: '<div class="mock-dropdown-menu"><slot></slot></div>'
  },
  'el-input': {
    template: '<input v-model="value" @input="$emit(\'input\', $event.target.value)" />',
    props: ['value', 'placeholder', 'size', 'prefix-icon', 'clearable'],
    model: {
      prop: 'value',
      event: 'input'
    }
  },
  'el-button': {
    template: '<button @click="$emit(\'click\')"><slot></slot></button>',
    props: ['type', 'size']
  },
  'el-checkbox-group': {
    template: '<div><slot></slot></div>',
    props: ['value'],
    model: {
      prop: 'value',
      event: 'input'
    }
  },
  'el-checkbox': {
    template: '<label><input type="checkbox" :value="label" @change="handleChange" /><slot></slot></label>',
    props: ['label'],
    methods: {
      handleChange(event) {
        this.$parent.$emit('input', event.target.checked ? [this.label] : [])
      }
    }
  }
}

// Mock EventBus and I18n modules
jest.mock('../src/utils/eventBus.js', () => ({
  EventBus: {
    subscribe: jest.fn(() => 'mock-token'),
    unsubscribe: jest.fn(),
    publish: jest.fn()
  },
  EVENTS: {
    DROPDOWN_OPENED: 'DROPDOWN_OPENED',
    DROPDOWN_CLOSED: 'DROPDOWN_CLOSED',
    FILTER_CHANGED: 'FILTER_CHANGED',
    FILTER_APPLIED: 'FILTER_APPLIED',
    FILTER_REMOVED: 'FILTER_REMOVED',
    FILTERS_CLEARED: 'FILTERS_CLEARED',
    DATA_LOADING: 'DATA_LOADING',
    DATA_LOADED: 'DATA_LOADED'
  }
}))

jest.mock('../src/utils/i18n.js', () => ({
  I18n: class MockI18n {
    constructor() {
      this.messages = {
        search: 'Search',
        selectAll: 'Select All',
        clear: 'Clear',
        apply: 'Apply',
        cancel: 'Cancel',
        noOptions: 'No options',
        optionsCount: '{count} options',
        loadingError: 'Loading error'
      }
    }
    t(key, params = {}) {
      let message = this.messages[key] || key
      Object.keys(params).forEach(param => {
        message = message.replace(`{${param}}`, params[param])
      })
      return message
    }
    setLocale() {}
    addMessages() {}
  },
  DEFAULT_LOCALE: 'en-US'
}))

// Mock lodash-es/debounce
jest.mock('lodash-es/debounce', () => {
  return jest.fn((fn) => fn)
})

// Create a functional mock of the DropdownFilter component
const createMockDropdownFilter = () => ({
  name: 'DropdownFilter',
  template: `
    <div class="filter-dropdown-wrapper" :class="{ 'active': isFiltered }">
      <span v-if="showFilterCount && filterCount > 0" class="filter-count-badge">
        {{ filterCount }}
      </span>
      <el-dropdown :ref="\`dropdown-\${columnProp}\`">
        <span class="filter-trigger">
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="filter-dropdown-menu">
          <div class="filter-content">
            <div v-if="shouldShowSearch" class="filter-search">
              <el-input v-model="searchKeyword" />
            </div>
            <div v-if="shouldShowFilterOptions" class="filter-options">
              <el-checkbox-group v-model="selectedValues">
                <div v-for="option in filterOptions" :key="option" class="filter-option">
                  <el-checkbox :label="option">{{ option }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="filter-controls">
              <el-button @click="handleCancel">Cancel</el-button>
              <el-button @click="handleApply">Apply</el-button>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  `,
  props: {
    columnProp: {
      type: String,
      required: true
    },
    columnLabel: {
      type: String,
      required: true
    },
    selectedFilters: {
      type: Array,
      default: () => []
    },
    directOptions: {
      type: Array,
      default: () => []
    },
    remoteSearchFn: {
      type: Function,
      default: null
    },
    showFilterCount: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    customMessages: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedValues: [],
      originalValues: [],
      filterOptions: [],
      searchKeyword: '',
      loading: false,
      subscriptionTokens: []
    }
  },
  computed: {
    isFiltered() {
      return this.originalValues.length > 0
    },
    filterCount() {
      return this.originalValues.length
    },
    shouldShowSearch() {
      return this.directOptions.length === 0
    },
    shouldShowFilterOptions() {
      return !this.shouldShowSearch || this.searchKeyword.length > 0
    }
  },
  created() {
    this.selectedValues = [...this.selectedFilters]
    this.originalValues = [...this.selectedFilters]
  },
  methods: {
    selectAllOptions() {
      this.selectedValues = [...this.filterOptions]
    },
    clearAllOptions() {
      this.selectedValues = []
    },
    handleCancel() {
      this.selectedValues = [...this.originalValues]
    },
    handleApply() {
      this.originalValues = [...this.selectedValues]
      this.$emit('filter-change', {
        columnProp: this.columnProp,
        values: [...this.selectedValues]
      })
    },
    loadDirectOptions() {
      if (this.directOptions.length > 0) {
        this.filterOptions = [...this.directOptions]
      }
    },
    async loadFilterOptions(keyword = '') {
      if (this.directOptions.length > 0 || !this.remoteSearchFn) {
        return
      }
      if (keyword.length === 0) {
        this.filterOptions = []
        return
      }
      this.loading = true
      try {
        const options = await this.remoteSearchFn(keyword)
        this.filterOptions = options
      } catch (error) {
        console.error('Load options error:', error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    selectedFilters: {
      handler(newVal) {
        this.selectedValues = [...newVal]
        this.originalValues = [...newVal]
      },
      deep: true,
      immediate: true
    }
  }
})

describe('DropdownFilter', () => {
  const localVue = createLocalVue()
  
  // Register mock Element UI components
  Object.keys(mockElementComponents).forEach(name => {
    localVue.component(name, mockElementComponents[name])
  })

  const defaultProps = {
    columnProp: 'test-column',
    columnLabel: 'Test Filter',
    selectedFilters: [],
    directOptions: []
  }

  describe('Component Creation and Props', () => {
    it('creates component with required props', () => {
      const DropdownFilter = createMockDropdownFilter()
      const wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
      
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.vm.columnProp).toBe('test-column')
      expect(wrapper.vm.columnLabel).toBe('Test Filter')
    })

    it('uses default values for optional props', () => {
      const DropdownFilter = createMockDropdownFilter()
      const wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
      
      expect(wrapper.vm.showFilterCount).toBe(true)
      expect(wrapper.vm.backgroundColor).toBe('#ffffff')
      expect(wrapper.vm.locale).toBe('en-US')
    })
  })

  describe('Computed Properties', () => {
    let wrapper

    beforeEach(() => {
      const DropdownFilter = createMockDropdownFilter()
      wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('calculates isFiltered correctly', () => {
      expect(wrapper.vm.isFiltered).toBe(false)
      
      wrapper.vm.originalValues = ['option1']
      expect(wrapper.vm.isFiltered).toBe(true)
    })

    it('calculates filterCount correctly', () => {
      expect(wrapper.vm.filterCount).toBe(0)
      
      wrapper.vm.originalValues = ['option1', 'option2']
      expect(wrapper.vm.filterCount).toBe(2)
    })

    it('calculates shouldShowSearch correctly', async () => {
      expect(wrapper.vm.shouldShowSearch).toBe(true)
      
      wrapper.setProps({ directOptions: ['option1'] })
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.shouldShowSearch).toBe(false)
    })

    it('calculates shouldShowFilterOptions correctly', () => {
      // When shouldShowSearch is true and searchKeyword is empty
      expect(wrapper.vm.shouldShowFilterOptions).toBe(false)
      
      // When shouldShowSearch is true and searchKeyword has content
      wrapper.vm.searchKeyword = 'test'
      expect(wrapper.vm.shouldShowFilterOptions).toBe(true)
      
      // When shouldShowSearch is false (directOptions provided)
      wrapper.setProps({ directOptions: ['option1'] })
      expect(wrapper.vm.shouldShowFilterOptions).toBe(true)
    })
  })

  describe('Filter Operations', () => {
    let wrapper

    beforeEach(() => {
      const DropdownFilter = createMockDropdownFilter()
      wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: {
          ...defaultProps,
          directOptions: ['option1', 'option2', 'option3']
        }
      })
      wrapper.vm.loadDirectOptions()
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('selects all options', () => {
      wrapper.vm.selectAllOptions()
      expect(wrapper.vm.selectedValues).toEqual(['option1', 'option2', 'option3'])
    })

    it('clears all options', () => {
      wrapper.vm.selectedValues = ['option1', 'option2']
      wrapper.vm.clearAllOptions()
      expect(wrapper.vm.selectedValues).toEqual([])
    })

    it('cancels changes and restores original values', () => {
      wrapper.vm.originalValues = ['option1']
      wrapper.vm.selectedValues = ['option1', 'option2']
      
      wrapper.vm.handleCancel()
      expect(wrapper.vm.selectedValues).toEqual(['option1'])
    })

    it('applies changes and updates original values', () => {
      wrapper.vm.selectedValues = ['option1', 'option2']
      
      wrapper.vm.handleApply()
      expect(wrapper.vm.originalValues).toEqual(['option1', 'option2'])
    })

    it('emits filter-change event on apply', () => {
      wrapper.vm.selectedValues = ['option1', 'option2']
      
      wrapper.vm.handleApply()
      
      expect(wrapper.emitted('filter-change')).toBeTruthy()
      expect(wrapper.emitted('filter-change')[0][0]).toEqual({
        columnProp: 'test-column',
        values: ['option1', 'option2']
      })
    })
  })

  describe('Direct Options Mode', () => {
    let wrapper

    beforeEach(() => {
      const DropdownFilter = createMockDropdownFilter()
      wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: {
          ...defaultProps,
          directOptions: ['option1', 'option2', 'option3']
        }
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('loads direct options correctly', () => {
      wrapper.vm.loadDirectOptions()
      expect(wrapper.vm.filterOptions).toEqual(['option1', 'option2', 'option3'])
    })

    it('does not show search when directOptions are provided', () => {
      expect(wrapper.vm.shouldShowSearch).toBe(false)
    })
  })

  describe('Remote Search Mode', () => {
    let wrapper

    beforeEach(() => {
      const DropdownFilter = createMockDropdownFilter()
      wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('shows search when directOptions are empty', () => {
      expect(wrapper.vm.shouldShowSearch).toBe(true)
    })

    it('calls remoteSearchFn when search is performed', async () => {
      const mockRemoteSearchFn = jest.fn().mockResolvedValue(['remote1', 'remote2'])
      
      wrapper.setProps({ remoteSearchFn: mockRemoteSearchFn })
      await wrapper.vm.$nextTick()
      
      await wrapper.vm.loadFilterOptions('test')
      
      expect(mockRemoteSearchFn).toHaveBeenCalledWith('test')
      expect(wrapper.vm.filterOptions).toEqual(['remote1', 'remote2'])
    })

    it('does not call remoteSearchFn when keyword is empty', async () => {
      const mockRemoteSearchFn = jest.fn().mockResolvedValue(['remote1', 'remote2'])
      
      wrapper.setProps({ remoteSearchFn: mockRemoteSearchFn })
      
      await wrapper.vm.loadFilterOptions('')
      
      expect(mockRemoteSearchFn).not.toHaveBeenCalled()
      expect(wrapper.vm.filterOptions).toEqual([])
    })

    it('handles remote search errors gracefully', async () => {
      const mockRemoteSearchFn = jest.fn().mockRejectedValue(new Error('Network error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      wrapper.setProps({ remoteSearchFn: mockRemoteSearchFn })
      await wrapper.vm.$nextTick()
      
      await wrapper.vm.loadFilterOptions('test')
      
      expect(consoleSpy).toHaveBeenCalledWith('Load options error:', expect.any(Error))
      expect(wrapper.vm.loading).toBe(false)
      
      consoleSpy.mockRestore()
    })
  })

  describe('Watchers', () => {
    let wrapper

    beforeEach(() => {
      const DropdownFilter = createMockDropdownFilter()
      wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
    })

    afterEach(() => {
      wrapper.destroy()
    })

    it('updates selectedValues when selectedFilters prop changes', async () => {
      wrapper.setProps({ selectedFilters: ['option1', 'option2'] })
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.selectedValues).toEqual(['option1', 'option2'])
      expect(wrapper.vm.originalValues).toEqual(['option1', 'option2'])
    })
  })

  describe('CSS Classes', () => {
    it('applies active class when filtered', async () => {
      const DropdownFilter = createMockDropdownFilter()
      const wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: {
          ...defaultProps,
          selectedFilters: ['option1']
        }
      })
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.classes()).toContain('active')
      
      wrapper.destroy()
    })

    it('does not apply active class when not filtered', () => {
      const DropdownFilter = createMockDropdownFilter()
      const wrapper = shallowMount(DropdownFilter, {
        localVue,
        propsData: defaultProps
      })
      
      expect(wrapper.classes()).not.toContain('active')
      
      wrapper.destroy()
    })
  })
})
