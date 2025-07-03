import Vue from 'vue'

/**
 * Payload emitted when filter values change
 */
export interface FilterChangePayload {
  /** The unique identifier for the column */
  columnProp: string
  /** Array of selected filter values */
  values: string[]
}

/**
 * Event data structure used by the EventBus for component communication
 */
export interface EventBusEvent {
  /** The unique identifier for the column */
  columnProp: string
  /** Display name of the column */
  columnLabel?: string
  /** Currently selected filter values */
  selectedValues?: string[]
  /** Current search keyword */
  searchKeyword?: string
  /** Filter values being applied */
  values?: string[]
  /** Single filter value (used for removal events) */
  value?: string
  /** Source component that triggered the event */
  source?: string
  /** Search keyword for remote search */
  keyword?: string
  /** Number of options returned from search */
  optionsCount?: number
}

/**
 * Custom translation messages organized by locale
 * 
 * @example
 * ```typescript
 * const messages: CustomMessages = {
 *   'en-US': {
 *     search: 'Search...',
 *     apply: 'Apply Filters'
 *   },
 *   'es-ES': {
 *     search: 'Buscar...',
 *     apply: 'Aplicar Filtros'
 *   }
 * }
 * ```
 */
export interface CustomMessages {
  [locale: string]: {
    [key: string]: string
  }
}

/**
 * Component props interface for DropdownFilter
 */
export interface DropdownFilterProps {
  /** Unique identifier for the column (required) */
  columnProp: string
  /** Display name of the column (required) */
  columnLabel: string
  /** Initially selected filter values */
  selectedFilters?: string[]
  /** Predefined list of filter options (disables remote search when provided) */
  directOptions?: string[]
  /** Function to fetch options remotely based on search keyword */
  remoteSearchFn?: (keyword: string) => Promise<string[]>
  /** Whether to show the filter count badge */
  showFilterCount?: boolean
  /** Locale for internationalization */
  locale?: string
  /** Custom translation messages */
  customMessages?: CustomMessages
}

/**
 * Vue DropdownFilter Component
 * 
 * A flexible dropdown filter component for Vue 2 applications with support for
 * both static options and remote search functionality.
 * 
 * @example
 * ```vue
 * <template>
 *   <DropdownFilter
 *     columnProp="status"
 *     columnLabel="Status"
 *     :directOptions="['Active', 'Inactive']"
 *     @filter-change="handleFilterChange"
 *   />
 * </template>
 * ```
 */

export default class DropdownFilter extends Vue {
  // Props
  /** Unique identifier for the column */
  columnProp: string
  /** Display name of the column */
  columnLabel: string
  /** Array of currently selected filter values */
  selectedFilters: string[]
  /** Predefined list of filter options */
  directOptions: string[]
  /** Function to fetch options remotely */
  remoteSearchFn?: (keyword: string) => Promise<string[]>
  /** Whether to show the filter count badge */
  showFilterCount: boolean
  /** Current locale for internationalization */
  locale: string
  /** Custom translation messages */
  customMessages: CustomMessages

  // Data properties
  /** Currently selected values (internal state) */
  selectedValues: string[]
  /** Original values before user modifications */
  originalValues: string[]
  /** Available filter options */
  filterOptions: string[]
  /** Current search keyword */
  searchKeyword: string
  /** Loading state for remote search */
  loading: boolean
  /** Debounced search function */
  debouncedSearch: Function | null
  /** EventBus subscription tokens */
  subscriptionTokens: any[]
  /** Internationalization instance */
  i18n: any

  // Computed properties
  /** Whether any filters are currently applied */
  readonly isFiltered: boolean
  /** Number of applied filters */
  readonly filterCount: number
  /** Whether to show the search input */
  readonly shouldShowSearch: boolean
  /** Whether to use remote search */
  readonly shouldUseRemoteSearch: boolean
  /** Whether to show the filter options list */
  readonly shouldShowFilterOptions: boolean

  // Public methods
  /** Select all available options */
  selectAllOptions(): void
  /** Clear all selected options */
  clearAllOptions(): void
  /** Cancel changes and restore original values */
  handleCancel(): void
  /** Apply selected changes and emit events */
  handleApply(): void
  /** Handle dropdown visibility changes */
  handleVisibleChange(visible: boolean): void
  /** Handle search input changes */
  handleSearchInput(): void
  /** Handle option selection changes */
  handleSelectionChange(): void
  /** Load direct options into filter options */
  loadDirectOptions(): void
  /** Load options via remote search */
  loadFilterOptions(keyword?: string): Promise<void>
  /** Close the dropdown programmatically */
  closeDropdown(): void

  // EventBus event handlers
  /** Handle filter removal from external components */
  onFilterRemoved(data: EventBusEvent): void
  /** Handle filter clearing from external components */
  onFiltersCleared(data: EventBusEvent): void

  // Lifecycle methods
  /** Set up EventBus listeners */
  setupEventListeners(): void
  /** Clean up EventBus listeners */
  cleanupEventListeners(): void

  // Events
  /** Emitted when filter values are applied */
  $emit(event: 'filter-change', payload: FilterChangePayload): this
}

// Export types for external use
export {
  DropdownFilter,
  FilterChangePayload,
  EventBusEvent,
  CustomMessages,
  DropdownFilterProps
}

// Vue component declaration for object-style usage
declare const DropdownFilterComponent: {
  name: 'DropdownFilter'
  props: DropdownFilterProps
  data(): {
    selectedValues: string[]
    originalValues: string[]
    filterOptions: string[]
    searchKeyword: string
    loading: boolean
    debouncedSearch: Function | null
    subscriptionTokens: any[]
    i18n: any
  }
  computed: {
    isFiltered(): boolean
    filterCount(): number
    shouldShowSearch(): boolean
    shouldUseRemoteSearch(): boolean
    shouldShowFilterOptions(): boolean
  }
  methods: {
    selectAllOptions(): void
    clearAllOptions(): void
    handleCancel(): void
    handleApply(): void
    handleVisibleChange(visible: boolean): void
    handleSearchInput(): void
    handleSelectionChange(): void
    loadDirectOptions(): void
    loadFilterOptions(keyword?: string): Promise<void>
    closeDropdown(): void
    onFilterRemoved(data: EventBusEvent): void
    onFiltersCleared(data: EventBusEvent): void
    setupEventListeners(): void
    cleanupEventListeners(): void
  }
}

// Module declaration for TypeScript imports
declare module '@terry0316/vue2-dropdown-filter' {
  export default DropdownFilterComponent
  export {
    FilterChangePayload,
    EventBusEvent,
    CustomMessages,
    DropdownFilterProps
  }
}

// Global component registration support
declare module 'vue/types/vue' {
  interface Vue {
    $dropdownFilter: typeof DropdownFilter
  }
}

// Support for Vue.component() registration
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    dropdownFilter?: typeof DropdownFilterComponent
  }
}
