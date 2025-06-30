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

  - **Vue.js**: The core framework.
  - **Element UI**: Used for UI components like dropdowns, buttons, checkboxes, and inputs.
  - **lodash.debounce**: Used to debounce user input for remote searches.
  - **EventBus**: A custom event bus utility (`utils/eventBus.js`) for cross-component communication.
  - **I18n**: A custom internationalization utility (`utils/i18n.js`) for managing translations.

## Installation

1.  **Prerequisites**: Ensure your project has Vue.js, Element UI, and `lodash.debounce` installed.
    ```bash
    npm install element-ui lodash.debounce
    ```
2.  **Add Component**: Copy the `DropdownFilter.vue` file into your project's components directory.
3.  **Utilities**: Make sure the required utility files, `eventBus.js` and `i18n.js`, are present in your project's `utils` directory and are correctly referenced.
4.  **Import**: Import the component into the parent Vue file where you intend to use it.
    ```javascript
    import DropdownFilter from './components/DropdownFilter.vue';
    ```

## Usage

Here are two examples demonstrating how to use the component in both direct options mode and remote search mode.

### Example 1: Direct Options

Use the `directOptions` prop when you have a small, predefined set of filter options.

```vue
<template>
  <div>
    <DropdownFilter
      columnProp="status"
      columnLabel="Status"
      :selectedFilters="activeStatusFilters"
      :directOptions="['Active', 'Inactive', 'Pending', 'Archived']"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script>
import DropdownFilter from './components/DropdownFilter.vue';

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
    onFilterChange(payload) {
      // { columnProp: 'status', values: [...] }
      console.log('Filters updated:', payload);
      this.activeStatusFilters = payload.values;
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
      columnProp="user"
      columnLabel="User"
      :selectedFilters="activeUserFilters"
      :remoteSearchFn="searchUsers"
      @filter-change="onFilterChange"
    />
  </div>
</template>

<script>
import DropdownFilter from './components/DropdownFilter.vue';
import { fetchUsersAPI } from './api'; // Your API fetching logic

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
    onFilterChange(payload) {
      // { columnProp: 'user', values: [...] }
      console.log('Filters updated:', payload);
      this.activeUserFilters = payload.values;
      // Add logic to refetch table data with new filters
    }
  }
};
</script>
```

-----

## API

### Props

| Prop              | Type     | Required | Default        | Description                                                                                                                              |
| ----------------- | -------- | -------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `columnProp`      | `String` | `true`   | `undefined`    | A unique identifier for the column (e.g., 'userName', 'status').                                                                         |
| `columnLabel`     | `String` | `true`   | `undefined`    | The display name of the column, used in messages and logs (e.g., 'User Name').                                                           |
| `selectedFilters` | `Array`  | `false`  | `[]`           | An array of initially selected filter values.                                                                                            |
| `directOptions`   | `Array`  | `false`  | `[]`           | A predefined array of string options for the filter dropdown. If provided, remote search is disabled.                                    |
| `remoteSearchFn`  | `Function`| `false` | `null`         | A function that accepts a `keyword` and returns a `Promise` which resolves to an array of string options. Used when `directOptions` is empty. |
| `showFilterCount` | `Boolean`| `false`  | `true`         | If `true`, displays a badge showing the count of applied filters.                                                                        |
| `locale`          | `String` | `false`  | `en`           | The locale for i18n. See the "Internationalization" section for details.                                                                 |
| `customMessages`  | `Object` | `false`  | `{}`           | An object containing custom translations. See the "Internationalization" section for details.                                            |

### Events

#### Emitted Events (`$emit`)

The component emits one primary event to its parent for backward compatibility. However, the recommended way to manage state is via the `EventBus`.

| Event           | Payload                                        | Description                                                      |
| --------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `filter-change` | `{ columnProp: String, values: Array<String> }` | Fired when the "Apply" button is clicked. Contains the final selected values. |

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

The component has built-in text that can be translated. You can provide your own translations using the `locale` and `customMessages` props.

**Default English Keys (`en`)**:

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

### Example: Providing Spanish Translations

```vue
<template>
  <DropdownFilter
    columnProp="category"
    columnLabel="Categoría"
    :remoteSearchFn="searchCategories"
    locale="es"
    :customMessages="esMessages"
    @filter-change="onFilterChange"
  />
</template>

<script>
export default {
  data() {
    return {
      esMessages: {
        es: {
          search: "Buscar",
          optionsCount: "{count} opciones",
          selectAll: "Seleccionar todo",
          clear: "Limpiar",
          noOptions: "No hay opciones",
          cancel: "Cancelar",
          apply: "Aplicar",
          loadingError: "Error al cargar opciones de {label}"
        }
      }
    };
  },
  // ... other methods
}
</script>
```

## Styling

The component's styles are scoped using the `<style scoped>` tag to prevent them from leaking into other parts of your application. It relies on the global styles of **Element UI**, so ensure Element UI's CSS is properly imported in your project.

Customization can be done by overriding the scoped CSS classes within the component file or by using deep selectors from a parent component if necessary.