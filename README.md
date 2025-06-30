# @TerryChen0316/vue2-dropdown-filter

Test only. A reusable Vue 2 + Element UI dropdown filter component for filtering table data.  
It supports dynamic option lists, placeholder text, default values, and emits filter events for parent components to handle.

## 📦 Installation

```bash
npm install @terry0316/vue2-dropdown-filter
````

## 🧩 Component Features

* ✅ Vue 2 support
* ✅ Element UI integration
* ✅ Emits `filter-change` event on selection
* ✅ Supports dynamic dropdown items
* ✅ Can be used in Element UI table header slots

## 🔧 Props

| Prop          | Type      | Required | Description                                        |
| ------------- | --------- | -------- | -------------------------------------------------- |
| `label`       | `String`  | ❌        | The label for the dropdown (optional UI use only). |
| `value`       | `String`  | ❌        | Currently selected value. Supports `v-model`.      |
| `options`     | `Array`   | ✅        | Array of `{ label, value }` items for dropdown.    |
| `placeholder` | `String`  | ❌        | Placeholder text. Default: `"Please select"`       |
| `prop`        | `String`  | ✅        | The column key this filter is bound to.            |
| `disabled`    | `Boolean` | ❌        | Whether the dropdown is disabled. Default: `false` |

## 🔁 Events

| Event Name      | Payload                        | Description                              |
| --------------- | ------------------------------ | ---------------------------------------- |
| `filter-change` | `{ prop: string, value: any }` | Emitted when dropdown value is selected. |

## ✨ Usage Example

```vue
<template>
  <el-table :data="filteredData" style="width: 100%">
    <el-table-column label="Status" prop="status">
      <template #header>
        <DropdownFilter
          prop="status"
          :options="statusOptions"
          v-model="filters.status"
          placeholder="Select status"
          @filter-change="handleFilterChange"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import DropdownFilter from '@TerryChen0316/vue2-dropdown-filter'

export default {
  components: { DropdownFilter },
  data() {
    return {
      filters: {
        status: ''
      },
      statusOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
      ],
      tableData: [
        { id: 1, status: 'active' },
        { id: 2, status: 'inactive' }
      ]
    }
  },
  computed: {
    filteredData() {
      const { status } = this.filters
      return status
        ? this.tableData.filter(row => row.status === status)
        : this.tableData
    }
  },
  methods: {
    handleFilterChange({ prop, value }) {
      console.log(`Filtering ${prop} by`, value)
    }
  }
}
</script>
```

## 🧪 Testing

To run unit tests:

```bash
npm run test
```

## 📜 License

MIT © 2025 Terry Chen
