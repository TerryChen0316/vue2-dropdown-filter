# DropdownFilter.vue Component

## Overview

`DropdownFilter.vue` is a reusable Vue component that provides a flexible and powerful dropdown filter for data tables. It is designed to be attached to a table column header, offering users the ability to select multiple values to filter the data.

The component supports two primary modes of operation:

1.  **Direct Options Mode**: Populating the filter with a predefined list of options.
2.  **Remote Search Mode**: Dynamically fetching filter options from a server based on user input, which is ideal for columns with a large number of potential filter values.

It is built using `element-ui` and features robust state management through an event bus, allowing it to seamlessly integrate with other components, such as a centralized "active filters" display. It also includes built-in support for internationalization (i18n).

## Features

  - **Two Data Modes**: Works with either a static list of options (`directOptions`) or a dynamic `remoteSearchFn`.
  - **Multi-Select**: Users can select multiple filter values using checkboxes.
  - **Search Functionality**: An input field to search for options when in remote mode.
  - **State Management**:
      - Communicates with other components via an `EventBus` to keep filter states synchronized.
      - Remembers applied filters and indicates an active filter state.
  - **Filter Count Badge**: Optionally displays a badge with the number of applied filters for a given column.
  - **User-Friendly Controls**: Includes "Select All", "Clear", "Apply", and "Cancel" buttons for easy interaction.
  - **Internationalization (i18n)**: All UI text can be translated using the `locale` and `customMessages` props.
  - **Debounced Search**: Optimizes performance by debouncing search requests in remote mode.
  - **Loading State**: Provides visual feedback to the user while fetching remote data.

## Dependencies

  - **Vue.js**: The core framework (^2.7.16).
  - **Element UI**: Used for UI components like dropdowns, buttons, checkboxes, and inputs (^2.15.14).
  - **lodash-es**: Used for utility functions like debounce for user input optimization (^4.17.21).
  - **pubsub-js**: Used for the EventBus communication pattern (^1.9.4).

### Development Dependencies

The component includes a full development setup with:
- **Jest**: Testing framework
- **Vue Test Utils**: Vue-specific testing utilities
- **Babel**: JavaScript compilation
- **ESLint**: Code linting (optional)

## Installation

### Using npm

```bash
npm install @terry0316/vue2-dropdown-filter
```

### Manual Installation

1.  **Prerequisites**: Ensure your project has the required dependencies installed:
    ```bash
    npm install element-ui lodash-es pubsub-js vue@^2.7.16
    ```

2.  **Add Component**: Import and register the component in your Vue application:
    ```javascript
    import DropdownFilter from '@terry0316/vue2-dropdown-filter'
    
    // Global registration
    Vue.component('DropdownFilter', DropdownFilter)
    
    // Or local registration in a component
    export default {
      components: {
        DropdownFilter
      }
      // ...
    }
    ```

3.  **Element UI Setup**: Ensure Element UI is properly configured in your project:
    ```javascript
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    
    Vue.use(ElementUI)
    ```

## Development

This component includes a full development environment for testing and demonstration.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/TerryChen0316/vue2-dropdown-filter.git
cd vue2-dropdown-filter

# Install dependencies
npm install

# Start development server (includes demo)
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Demo Application

The project includes a comprehensive demo at `http://localhost:3000` when running `npm run dev`. The demo showcases:

- **Direct Options Mode**: Pre-defined category filters
- **Remote Search Mode**: Dynamic user search with API simulation
- **Internationalization**: Multi-language support (English, Chinese, Spanish)
- **Styling Customization**: Background color picker
- **State Management**: Real-time filter synchronization
- **Event Handling**: Complete event flow demonstration

## Testing

This component comes with a comprehensive test suite using Jest and Vue Test Utils. The tests cover:

- Component creation and prop validation
- Computed properties and reactive behavior
- Filter operations (select all, clear, apply, cancel)
- Direct options and remote search modes
- Event emission and EventBus communication
- Error handling and edge cases
- Internationalization functionality

### Running Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage

The test suite includes 20+ test cases covering:
- ✅ Component lifecycle and creation
- ✅ Props validation and default values
- ✅ Computed property calculations
- ✅ User interactions and event handling
- ✅ Remote search functionality with success/error scenarios
- ✅ Direct options handling
- ✅ Reactive data updates via watchers
- ✅ CSS class conditional rendering

## Usage

Here are two examples demonstrating how to use the component in both direct options mode and remote search mode.

### Example 1: Direct Options

Use the `directOptions` prop when you have a small, predefined set of filter options.

```vue
<template>
  <div>
    <DropdownFilter
      column-prop="status"
      column-label="Status"
      :selected-filters="activeStatusFilters"
      :direct-options="['Active', 'Inactive', 'Pending', 'Archived']"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script>
import DropdownFilter from '@terry0316/vue2-dropdown-filter'

export default {
  components: {
    DropdownFilter
  },
  data() {
    return {
      activeStatusFilters: ['Active'] // Pre-selected filters
    };
  },
  methods: {
    onFilterChange(data) {
      // { columnProp: 'status', values: [...] }
      console.log('Filters updated:', data);
      this.activeStatusFilters = data.values;
      // Add logic to refetch table data with new filters
    }
  }
};
</script>
```

### Example 2: Remote Search

Use the `remoteSearchFn` prop to fetch options from an API. The component will only show a search bar and will call this function with the user's search term.

```vue
<template>
  <div>
    <DropdownFilter
      column-prop="user"
      column-label="User"
      :selected-filters="activeUserFilters"
      :remote-search-fn="searchUsers"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script>
import DropdownFilter from '@terry0316/vue2-dropdown-filter'
import { fetchUsersAPI } from './api' // Your API fetching logic

export default {
  components: {
    DropdownFilter
  },
  data() {
    return {
      activeUserFilters: []
    };
  },
  methods: {
    async searchUsers(keyword) {
      // This function must return a Promise that resolves to an array of strings.
      if (!keyword) return [];
      try {
        const users = await fetchUsersAPI({ name: keyword });
        return users.map(user => user.name); // e.g., ['John Doe', 'Jane Smith']
      } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
      }
    },
    onFilterChange(data) {
      // { columnProp: 'user', values: [...] }
      console.log('Filters updated:', data);
      this.activeUserFilters = data.values;
      // Add logic to refetch table data with new filters
    }
  }
};
</script>
```

### Example 3: Complete Integration with All Features

Here's a comprehensive example showing all component features working together:

```vue
<template>
  <div class="filter-demo">
    <!-- Global Controls -->
    <div class="controls">
      <el-select v-model="currentLocale" @change="updateLocale" size="small">
        <el-option value="en-US" label="English"></el-option>
        <el-option value="zh-CN" label="中文"></el-option>
        <el-option value="es-ES" label="Español"></el-option>
      </el-select>
      
      <el-color-picker v-model="backgroundColor" size="small"></el-color-picker>
      
      <el-button @click="clearAllFilters" type="danger" size="small">
        Clear All
      </el-button>
    </div>

    <!-- Filter Components -->
    <div class="filter-components">
      <!-- Status Filter (Direct Options) -->
      <DropdownFilter
        column-prop="status"
        column-label="Status"
        :selected-filters="filters.status"
        :direct-options="statusOptions"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        @filter-change="onFilterChange"
      />

      <!-- User Filter (Remote Search) -->
      <DropdownFilter
        column-prop="user"
        column-label="User"
        :selected-filters="filters.user"
        :remote-search-fn="searchUsers"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        @filter-change="onFilterChange"
      />

      <!-- Category Filter (Pre-selected) -->
      <DropdownFilter
        column-prop="category"
        column-label="Category"
        :selected-filters="filters.category"
        :direct-options="categoryOptions"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        @filter-change="onFilterChange"
      />
    </div>

    <!-- Active Filters Display -->
    <div class="active-filters">
      <h4>Active Filters:</h4>
      <div v-for="(values, prop) in activeFilters" :key="prop">
        <strong>{{ getFilterLabel(prop) }}:</strong>
        <el-tag 
          v-for="value in values" 
          :key="value" 
          closable 
          @close="removeFilter(prop, value)"
          style="margin: 0 5px;"
        >
          {{ value }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownFilter from '@terry0316/vue2-dropdown-filter'

export default {
  components: {
    DropdownFilter
  },
  data() {
    return {
      currentLocale: 'en-US',
      backgroundColor: '#ffffff',
      
      // Filter options
      statusOptions: ['Active', 'Inactive', 'Pending', 'Archived'],
      categoryOptions: ['Electronics', 'Clothing', 'Books', 'Home'],
      
      // Current filter values
      filters: {
        status: ['Active'],      // Pre-selected
        user: [],
        category: ['Electronics'] // Pre-selected
      },
      
      // Multi-language support
      customMessages: {
        'en-US': {
          search: "Search users...",
          selectAll: "Select All",
          clear: "Clear",
          apply: "Apply Filters",
          cancel: "Cancel",
          noOptions: "No users found",
          optionsCount: "{count} users available",
          loadingError: "Failed to load {label}"
        },
        'zh-CN': {
          search: "搜索用户...",
          selectAll: "全选",
          clear: "清空",
          apply: "应用筛选",
          cancel: "取消",
          noOptions: "未找到用户",
          optionsCount: "找到 {count} 位用户",
          loadingError: "加载 {label} 失败"
        },
        'es-ES': {
          search: "Buscar usuarios...",
          selectAll: "Seleccionar todo",
          clear: "Limpiar",
          apply: "Aplicar filtros",
          cancel: "Cancelar",
          noOptions: "No se encontraron usuarios",
          optionsCount: "{count} usuarios disponibles",
          loadingError: "Error al cargar {label}"
        }
      }
    }
  },
  computed: {
    activeFilters() {
      const active = {}
      Object.keys(this.filters).forEach(key => {
        if (this.filters[key].length > 0) {
          active[key] = this.filters[key]
        }
      })
      return active
    }
  },
  methods: {
    onFilterChange(data) {
      console.log('Filter change:', data)
      this.$set(this.filters, data.columnProp, data.values)
      
      // Trigger data refetch
      this.refreshTableData()
    },
    
    async searchUsers(keyword) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const users = [
        'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown',
        'Charlie Wilson', 'David Lee', 'Emma Davis', 'Frank Miller'
      ]
      
      return users.filter(user => 
        user.toLowerCase().includes(keyword.toLowerCase())
      )
    },
    
    updateLocale(locale) {
      this.currentLocale = locale
    },
    
    clearAllFilters() {
      this.filters = {
        status: [],
        user: [],
        category: []
      }
      this.refreshTableData()
    },
    
    removeFilter(columnProp, value) {
      const index = this.filters[columnProp].indexOf(value)
      if (index > -1) {
        this.filters[columnProp].splice(index, 1)
        this.refreshTableData()
      }
    },
    
    getFilterLabel(prop) {
      const labels = {
        status: 'Status',
        user: 'User',
        category: 'Category'
      }
      return labels[prop] || prop
    },
    
    refreshTableData() {
      // Your table data refresh logic here
      console.log('Refreshing table with filters:', this.activeFilters)
    }
  }
}
</script>

<style scoped>
.filter-demo {
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-components {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.active-filters {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
}
</style>
```

-----

## API

### Props

| Prop              | Type       | Required | Default        | Description                                                                                                                              |
| ----------------- | ---------- | -------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `column-prop`     | `String`   | `true`   | `undefined`    | A unique identifier for the column (e.g., 'userName', 'status'). Used for event identification and internal state management. Uses kebab-case for HTML attributes. |
| `column-label`    | `String`   | `true`   | `undefined`    | The display name of the column, used in messages, logs, and error displays (e.g., 'User Name', 'Status').                              |
| `selected-filters`| `Array`    | `false`  | `[]`           | An array of initially selected filter values. These values will be pre-selected when the component mounts.                               |
| `direct-options`  | `Array`    | `false`  | `[]`           | A predefined array of string options for the filter dropdown. When provided, the component operates in "Direct Options Mode" and remote search is disabled. |
| `remote-search-fn`| `Function` | `false`  | `null`         | A function that accepts a `keyword` parameter and returns a `Promise` resolving to an array of string options. Used for "Remote Search Mode" when `directOptions` is empty. |
| `show-filter-count`| `Boolean` | `false`  | `true`         | Controls whether to display a badge showing the count of applied filters. The badge appears as a small blue circle with the filter count. |
| `background-color`| `String`   | `false`  | `'#ffffff'`    | Customizes the background color of the dropdown menu and filter content area. Accepts any valid CSS color value.                        |
| `locale`          | `String`   | `false`  | `'en-US'`      | The locale for internationalization. Determines the default language for UI text. Supported values include 'en-US', 'zh-CN', etc.      |
| `custom-messages` | `Object`   | `false`  | `{}`           | An object containing custom translations organized by locale. Structure: `{ 'locale': { 'key': 'translation' } }`. See the "Internationalization" section for complete details and examples. |

### Events

#### Emitted Events (`$emit`)

The component emits one primary event to its parent for backward compatibility. However, the recommended way to manage state is via the `EventBus`.

| Event           | Payload                                        | Description                                                      |
| --------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `filter-change` | `{ columnProp: String, values: Array<String> }` | Fired when the "Apply" button is clicked. Contains the final selected values. **Note**: The event handler receives the data object directly, not as separate parameters. |

#### EventBus Integration

The component heavily relies on an `EventBus` to communicate with other parts of the application, such as an `ActiveFilters` component that might display all currently applied filters.

**Published Events**

| Event               | Payload                                                               | Description                                                          |
| ------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `DROPDOWN_OPENED`   | `{ columnProp, columnLabel }`                                         | Published when the filter dropdown is opened.                        |
| `DROPDOWN_CLOSED`   | `{ columnProp, columnLabel }`                                         | Published when the filter dropdown is closed.                        |
| `FILTER_CHANGED`    | `{ columnProp, selectedValues?, searchKeyword?, source }`             | Published in real-time as the user selects/deselects options or types in the search box. |
| `FILTER_APPLIED`    | `{ columnProp, values, source }`                                      | Published when the user clicks the "Apply" button.                   |
| `DATA_LOADING`      | `{ columnProp, keyword }`                                             | Published just before a `remoteSearchFn` call is made.               |
| `DATA_LOADED`       | `{ columnProp, keyword, optionsCount }`                               | Published after the `remoteSearchFn` call successfully completes.    |

**Subscribed Events**

| Event             | Payload                             | Description                                                                                                    |
| ----------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `FILTER_REMOVED`  | `{ columnProp, value, source }`     | Listens for this event to remove a specific filter value from its state (e.g., when a user clears it from an external `ActiveFilters` component). |
| `FILTERS_CLEARED` | `{ source }`                        | Listens for this event to clear all its selected filters (e.g., when a "Clear All" button is clicked elsewhere). |

-----

## Internationalization (i18n)

The component provides comprehensive internationalization support through the `locale` and `customMessages` props. All user-facing text can be customized and translated to match your application's language requirements.

### Supported Locales

The component comes with built-in support for:
- **English (en-US)** - Default locale
- **Chinese Simplified (zh-CN)** - Built-in translations

You can extend support to any locale by providing custom translations via the `customMessages` prop.

### Default Translation Keys

**English (en-US) - Default Keys:**

```json
{
  "search": "Search",
  "optionsCount": "{count} options",
  "selectAll": "Select All",
  "clear": "Clear",
  "noOptions": "No options",
  "cancel": "Cancel",
  "apply": "Apply",
  "loadingError": "Failed to load {label} options"
}
```

### Using the `customMessages` Prop

The `customMessages` prop accepts an object structured by locale, where each locale contains key-value pairs for translations:

```javascript
{
  'locale-code': {
    'translation-key': 'translated-text',
    // ... more translations
  }
}
```

#### Simple Example: Single Locale Override

```vue
<template>
  <DropdownFilter
    column-prop="status"
    column-label="Status"
    locale="en-US"
    :custom-messages="customTranslations"
    :direct-options="['Active', 'Inactive']"
  />
</template>

<script>
export default {
  data() {
    return {
      customTranslations: {
        'en-US': {
          search: "Search for items...",
          selectAll: "Choose All",
          apply: "Filter Now"
        }
      }
    }
  }
}
</script>
```

#### Advanced Example: Multiple Locales

```vue
<template>
  <DropdownFilter
    column-prop="category"
    column-label="Categoría"
    :locale="currentLocale"
    :custom-messages="multiLangMessages"
    :remote-search-fn="searchCategories"
    @filter-change="onFilterChange"
  />
</template>

<script>
export default {
  data() {
    return {
      currentLocale: 'es-ES',
      multiLangMessages: {
        'es-ES': {
          search: "Buscar",
          optionsCount: "{count} opciones disponibles",
          selectAll: "Seleccionar todo",
          clear: "Limpiar selección",
          noOptions: "No hay opciones disponibles",
          cancel: "Cancelar",
          apply: "Aplicar filtros",
          loadingError: "Error al cargar opciones de {label}"
        },
        'fr-FR': {
          search: "Rechercher",
          optionsCount: "{count} options",
          selectAll: "Tout sélectionner",
          clear: "Effacer",
          noOptions: "Aucune option",
          cancel: "Annuler",
          apply: "Appliquer",
          loadingError: "Échec du chargement des options {label}"
        },
        'de-DE': {
          search: "Suchen",
          optionsCount: "{count} Optionen",
          selectAll: "Alle auswählen",
          clear: "Leeren",
          noOptions: "Keine Optionen",
          cancel: "Abbrechen",
          apply: "Anwenden",
          loadingError: "Fehler beim Laden der {label} Optionen"
        }
      }
    };
  },
  methods: {
    switchLanguage(locale) {
      this.currentLocale = locale;
    }
    // ... other methods
  }
}
</script>
```

### Key Features of `customMessages`

1. **Partial Overrides**: You don't need to provide all translation keys - only override the ones you want to customize
2. **Placeholder Support**: Some messages support placeholders like `{count}` and `{label}` for dynamic content
3. **Reactive Updates**: Changes to `customMessages` prop will immediately update the UI text
4. **Fallback Behavior**: If a translation key is missing, the component falls back to built-in defaults

-----

## Styling

The component provides flexible styling options while maintaining Element UI compatibility.

### Built-in Styling

The component uses scoped CSS to prevent style conflicts and includes:
- Responsive dropdown layout
- Filter count badge styling
- Loading state indicators
- Hover and active state animations
- Modern color scheme with customizable backgrounds

### Background Color Customization

Use the `backgroundColor` prop to customize the dropdown appearance:

```vue
<template>
  <DropdownFilter
    column-prop="theme"
    column-label="Theme"
    :direct-options="['Light', 'Dark']"
    background-color="#f8f9fa"
  />
</template>
```

### Advanced Styling

For deeper customization, you can override CSS classes using deep selectors:

```vue
<style>
/* Customize the filter trigger button */
.filter-dropdown-wrapper .filter-trigger:hover {
  color: #your-brand-color !important;
}

/* Customize the dropdown menu */
.filter-dropdown-wrapper ::v-deep .el-dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Customize the filter count badge */
.filter-dropdown-wrapper .filter-count-badge {
  background-color: #your-brand-color;
}
</style>
```

### Available CSS Classes

- `.filter-dropdown-wrapper` - Main container
- `.filter-count-badge` - Filter count indicator
- `.filter-trigger` - Dropdown trigger button
- `.filter-content` - Dropdown content area
- `.filter-search` - Search input container
- `.filter-options` - Options list container
- `.filter-controls` - Apply/Cancel button area

## Best Practices

### Performance Optimization

1. **Debounced Search**: The component automatically debounces remote search requests (300ms delay)
2. **Efficient Re-renders**: Use stable references for `directOptions` and `remoteSearchFn` props
3. **Memory Management**: The component automatically cleans up event listeners on destroy

### State Management

1. **EventBus Integration**: Leverage the EventBus for centralized filter state management
2. **Controlled Components**: Always sync local state with the `selectedFilters` prop
3. **Error Handling**: Implement proper error handling in your `remoteSearchFn`

### Accessibility

The component includes basic accessibility features:
- Keyboard navigation support through Element UI components
- ARIA labels for screen readers
- Focus management for dropdown interactions

## Troubleshooting

### Common Issues

**Issue**: Dropdown doesn't show options
- **Solution**: Ensure `direct-options` has values OR `remote-search-fn` is provided and working

**Issue**: Remote search not triggering
- **Solution**: Verify `direct-options` is empty and `remote-search-fn` returns a Promise

**Issue**: Translations not appearing
- **Solution**: Check that locale matches the key in `custom-messages` and restart the component

**Issue**: Import error with lodash-es
- **Solution**: The component now uses `lodash-es` for proper ES module compatibility. Ensure you have `lodash-es` installed instead of `lodash.debounce`.

**Issue**: Styling conflicts
- **Solution**: Ensure Element UI CSS is loaded and use scoped CSS or deep selectors for customization

### Debug Mode

Enable console logging to debug EventBus communication:

```javascript
// In your component or main app
import { EventBus } from '@terry0316/vue2-dropdown-filter/src/utils/eventBus.js'

// Log all events (development only)
EventBus.subscribe('*', (event, data) => {
  console.log('EventBus:', event, data)
})
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Start development server: `npm run dev`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/TerryChen0316/vue2-dropdown-filter.git
cd vue2-dropdown-filter

# Install dependencies
npm install

# Run tests
npm test

# Start development server with demo
npm run dev

# Run tests with coverage
npm test -- --coverage
```

### Project Structure

```
vue2-dropdown-filter/
├── src/
│   ├── components/
│   │   └── DropdownFilter.vue    # Main component
│   └── utils/
│       ├── eventBus.js           # EventBus implementation
│       └── i18n.js              # Internationalization utilities
├── demo/                        # Development demo application
│   ├── App.vue                  # Demo showcase
│   └── main.js                  # Demo entry point
├── __tests__/
│   └── DropdownFilter.spec.js   # Comprehensive test suite
├── types/
│   └── index.d.ts              # TypeScript definitions
└── package.json                # Project configuration
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/TerryChen0316/vue2-dropdown-filter/issues)
- **Documentation**: This README provides comprehensive usage examples
- **Tests**: Run `npm test` to see component behavior examples