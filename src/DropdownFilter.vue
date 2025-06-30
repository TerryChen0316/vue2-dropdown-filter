<template>
  <div 
    class="dropdown-filter-wrapper"
    :class="[{ 'active': isFiltered }, customClass, customClasses.wrapper]"
    :style="customStyles.wrapper"
  >
    <!-- Filter Count Badge -->
    <span 
      v-if="showFilterCount && filterCount > 0" 
      class="filter-count-badge"
      :class="customClasses.filterCountBadge"
      :style="customStyles.filterCountBadge"
    >
      {{ filterCount }}
    </span>
    
    <el-dropdown
      :ref="`dropdown-${columnProp}`"
      trigger="click"
      placement="bottom-end"
      :hide-on-click="false"
      @visible-change="handleVisibleChange"
    >
      <span 
        class="filter-trigger"
        :class="customClasses.filterTrigger"
        :style="customStyles.filterTrigger"
      >
        <i class="el-icon-arrow-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown-filter-menu">
        <div 
          class="filter-content"
          :class="customClasses.filterContent"
          :style="customStyles.filterContent"
        >
          <!-- Search Input - Only show when directOptions is empty -->
          <div 
            v-if="shouldShowSearch" 
            class="filter-search"
            :class="customClasses.filterSearch"
            :style="customStyles.filterSearch"
          >
            <el-input
              v-model="searchKeyword"
              :placeholder="i18n.t('search')"
              size="mini"
              prefix-icon="el-icon-search"
              @input="handleSearchInput"
              clearable
            />
          </div>
          
          <!-- Filter Options Header -->
          <div 
            class="filter-options-header"
            :class="customClasses.filterOptionsHeader"
            :style="customStyles.filterOptionsHeader"
          >
            <span 
              class="options-count"
              :class="customClasses.optionsCount"
              :style="customStyles.optionsCount"
            >
              {{ i18n.t('optionsCount', { count: filterOptions.length }) }}
            </span>
            <div 
              class="options-actions"
              :class="customClasses.optionsActions"
              :style="customStyles.optionsActions"
            >
              <el-button type="text" size="mini" @click="selectAllOptions">
                {{ i18n.t('selectAll') }}
              </el-button>
              <el-button type="text" size="mini" @click="clearAllOptions">
                {{ i18n.t('clear') }}
              </el-button>
            </div>
          </div>
          
          <!-- Options List -->
          <div 
            class="filter-options" 
            v-loading="loading"
            :class="customClasses.filterOptions"
            :style="customStyles.filterOptions"
          >
            <el-checkbox-group 
              v-model="selectedValues"
              @change="handleSelectionChange"
            >
              <div 
                v-for="option in filterOptions"
                :key="option"
                class="filter-option"
                :class="customClasses.filterOption"
                :style="customStyles.filterOption"
              >
                <el-checkbox :label="option">{{ option }}</el-checkbox>
              </div>
            </el-checkbox-group>
            
            <div 
              v-if="filterOptions.length === 0 && !loading" 
              class="no-options"
              :class="customClasses.noOptions"
              :style="customStyles.noOptions"
            >
              {{ i18n.t('noOptions') }}
            </div>
          </div>
          
          <!-- Filter Control Buttons -->
          <div 
            class="filter-controls"
            :class="customClasses.filterControls"
            :style="customStyles.filterControls"
          >
            <el-button 
              size="mini" 
              @click="handleCancel"
            >
              {{ i18n.t('cancel') }}
            </el-button>
            <el-button 
              type="primary" 
              size="mini" 
              @click="handleApply"
            >
              {{ i18n.t('apply') }}
            </el-button>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { EventBus, EVENTS } from '../utils/eventBus.js'
import { I18n, DEFAULT_LOCALE } from '../utils/i18n.js'

export default {
  name: 'DropdownFilter',
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
    // i18n props
    locale: {
      type: String,
      default: DEFAULT_LOCALE
    },
    customMessages: {
      type: Object,
      default: () => ({})
    },
    // Customization props
    customClass: {
      type: String,
      default: ''
    },
    customClasses: {
      type: Object,
      default: () => ({
        wrapper: '',
        filterCountBadge: '',
        filterTrigger: '',
        filterContent: '',
        filterSearch: '',
        filterOptionsHeader: '',
        optionsCount: '',
        optionsActions: '',
        filterOptions: '',
        filterOption: '',
        noOptions: '',
        filterControls: ''
      })
    },
    customStyles: {
      type: Object,
      default: () => ({
        wrapper: {},
        filterCountBadge: {},
        filterTrigger: {},
        filterContent: {},
        filterSearch: {},
        filterOptionsHeader: {},
        optionsCount: {},
        optionsActions: {},
        filterOptions: {},
        filterOption: {},
        noOptions: {},
        filterControls: {}
      })
    }
  },
  
  data() {
    return {
      selectedValues: [],
      originalValues: [],
      filterOptions: [],
      searchKeyword: '',
      loading: false,
      debouncedSearch: null,
      subscriptionTokens: [],
      i18n: new I18n(this.locale, this.customMessages)
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
      // Only show search when directOptions is empty
      return this.directOptions.length === 0
    },
    
    shouldUseRemoteSearch() {
      // Only use remote search when directOptions is empty and searchKeyword has content
      return this.directOptions.length === 0 && this.searchKeyword.length > 0
    }
  },
  
  watch: {
    selectedFilters: {
      handler(newVal) {
        this.selectedValues = [...newVal]
        this.originalValues = [...newVal]
      },
      deep: true
    },
    locale: {
      handler(newLocale) {
        this.i18n.setLocale(newLocale, this.customMessages)
      },
      immediate: false
    },
    customMessages: {
      handler(newMessages) {
        this.i18n.addMessages(newMessages)
      },
      deep: true
    }
  },
  
  created() {
    this.selectedValues = [...this.selectedFilters]
    this.originalValues = [...this.selectedFilters]
    this.debouncedSearch = debounce(this.performSearch, 300)
    this.setupEventListeners()
  },
  
  beforeDestroy() {
    this.cleanupEventListeners()
  },
  
  methods: {
    setupEventListeners() {
      // Listen for filter removal events from ActiveFilters
      const filterRemovedToken = EventBus.subscribe(EVENTS.FILTER_REMOVED, (data) => {
        this.onFilterRemoved(data)
      })
      
      // Listen for clear all filters events
      const filtersClearedToken = EventBus.subscribe(EVENTS.FILTERS_CLEARED, (data) => {
        this.onFiltersCleared(data)
      })
      
      this.subscriptionTokens.push(filterRemovedToken, filtersClearedToken)
    },
    
    cleanupEventListeners() {
      this.subscriptionTokens.forEach(token => {
        EventBus.unsubscribe(token)
      })
      this.subscriptionTokens = []
    },
    
    onFilterRemoved(data) {
      // Handle filter removal from ActiveFilters
      if (data.columnProp === this.columnProp && data.source !== 'DropdownFilter') {
        console.log(`[DropdownFilter-${this.columnProp}] Received filter removal:`, data)
        
        // Update local state to reflect the removal
        const index = this.selectedValues.indexOf(data.value)
        if (index > -1) {
          this.selectedValues.splice(index, 1)
          this.originalValues = [...this.selectedValues]
        }
      }
    },
    
    onFiltersCleared(data) {
      // Handle clear all filters from ActiveFilters
      if (data.source !== 'DropdownFilter') {
        console.log(`[DropdownFilter-${this.columnProp}] Received clear all filters:`, data)
        
        // Clear local state
        this.selectedValues = []
        this.originalValues = []
        this.searchKeyword = ''
      }
    },
    
    async handleVisibleChange(visible) {
      if (visible) {
        // Publish dropdown opened event
        EventBus.publish(EVENTS.DROPDOWN_OPENED, {
          columnProp: this.columnProp,
          columnLabel: this.columnLabel
        })
        
        // Store original values when dropdown opens
        this.originalValues = [...this.selectedValues]
        
        if (this.directOptions.length > 0) {
          // Use direct options from column
          this.loadDirectOptions()
        } else {
          // Load initial options (empty or with search)
          await this.loadFilterOptions(this.searchKeyword)
        }
      } else {
        // Publish dropdown closed event
        EventBus.publish(EVENTS.DROPDOWN_CLOSED, {
          columnProp: this.columnProp,
          columnLabel: this.columnLabel
        })
      }
    },
    
    handleSearchInput() {
      if (this.shouldShowSearch) {
        // Publish filter change event for real-time updates
        EventBus.publish(EVENTS.FILTER_CHANGED, {
          columnProp: this.columnProp,
          searchKeyword: this.searchKeyword,
          source: 'DropdownFilter'
        })
        
        this.debouncedSearch(this.searchKeyword)
      }
    },
    
    performSearch(keyword) {
      if (this.shouldShowSearch) {
        this.loadFilterOptions(keyword)
      }
    },
    
    async loadFilterOptions(keyword = '') {
      // Only use remote search when directOptions is empty and searchKeyword has content
      if (this.directOptions.length > 0 || !this.remoteSearchFn) {
        return
      }
      
      // If searchKeyword is empty, don't use remoteSearchFn
      if (keyword.length === 0) {
        this.filterOptions = []
        return
      }
      
      // Publish data loading event
      EventBus.publish(EVENTS.DATA_LOADING, {
        columnProp: this.columnProp,
        keyword
      })
      
      this.loading = true
      try {
        const options = await this.remoteSearchFn(keyword)
        this.filterOptions = options
        
        // Add currently selected values to options if not already present
        this.selectedValues.forEach(value => {
          if (!this.filterOptions.includes(value)) {
            this.filterOptions.push(value)
          }
        })
        
        // Publish data loaded event
        EventBus.publish(EVENTS.DATA_LOADED, {
          columnProp: this.columnProp,
          keyword,
          optionsCount: options.length
        })
      } catch (error) {
        this.$message.error(this.i18n.t('loadingError', { label: this.columnLabel }))
        console.error('Load options error:', error)
      } finally {
        this.loading = false
      }
    },
    
    loadDirectOptions() {
      // Load options directly from directOptions prop
      if (this.directOptions.length > 0) {
        this.filterOptions = [...this.directOptions]
      } else {
        this.filterOptions = []
      }
      
      // Add currently selected values to options if not already present
      this.selectedValues.forEach(value => {
        if (!this.filterOptions.includes(value)) {
          this.filterOptions.push(value)
        }
      })
    },
    
    handleSelectionChange() {
      // Add newly selected options to filter options if not already present
      this.selectedValues.forEach(value => {
        if (!this.filterOptions.includes(value)) {
          this.filterOptions.push(value)
        }
      })
      
      // Publish selection change event
      EventBus.publish(EVENTS.FILTER_CHANGED, {
        columnProp: this.columnProp,
        selectedValues: [...this.selectedValues],
        source: 'DropdownFilter'
      })
    },
    
    selectAllOptions() {
      this.selectedValues = [...this.filterOptions]
      this.handleSelectionChange()
    },
    
    clearAllOptions() {
      this.selectedValues = []
      this.handleSelectionChange()
    },
    
    handleCancel() {
      // Restore original values
      this.selectedValues = [...this.originalValues]
      this.closeDropdown()
    },
    
    handleApply() {
      // Update original values and emit change
      this.originalValues = [...this.selectedValues]
      
      // Publish filter applied event
      EventBus.publish(EVENTS.FILTER_APPLIED, {
        columnProp: this.columnProp,
        values: [...this.selectedValues],
        source: 'DropdownFilter'
      })
      
      // Still emit to parent for backward compatibility
      this.$emit('filter-change', {
        columnProp: this.columnProp,
        values: [...this.selectedValues]
      })
      
      this.closeDropdown()
    },
    
    closeDropdown() {
      const dropdown = this.$refs[`dropdown-${this.columnProp}`]
      if (dropdown) {
        dropdown.hide()
      }
    }
  }
}
</script>

<style scoped>
.dropdown-filter-wrapper {
  cursor: pointer;
  position: relative;
}

.dropdown-filter-wrapper.active .filter-trigger {
  color: #409eff;
}

.filter-count-badge {
  position: absolute;
  top: 1px;
  right: -6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10px;
  height: 10px;
  background-color: #409eff;
  color: white;
  font-size: 11px;
  font-weight: 500;
  border-radius: 9px;
  line-height: 1;
  z-index: 1;
}

.filter-trigger {
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 2px;
  transition: color 0.2s;
}

.filter-trigger:hover {
  color: #409eff;
}

.dropdown-filter-menu {
  min-width: 220px;
}

.filter-content {
  padding: 12px;
}

.filter-search {
  margin-bottom: 12px;
}

.filter-options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e4e7ed;
}

.options-count {
  font-size: 12px;
  color: #909399;
}

.options-actions {
  display: flex;
  gap: 8px;
}

.options-actions .el-button {
  padding: 0;
  font-size: 12px;
}

.filter-options {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 12px;
}

.filter-option {
  padding: 4px 0;
  white-space: nowrap;
}

.no-options {
  text-align: center;
  color: #909399;
  font-size: 12px;
  padding: 20px 0;
}

.filter-controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #e4e7ed;
}

.filter-controls .el-button {
  min-width: 60px;
}

/* Element UI overrides */
.el-dropdown-menu {
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-checkbox-group .el-checkbox {
  display: block;
  margin-right: 0;
}
</style>