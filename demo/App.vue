<template>
  <div id="app">
    <h1>Vue2 Dropdown Filter Demo</h1>
    
    <!-- Global Controls -->
    <div class="controls-section">
      <h3>Global Controls:</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <label>Locale:</label>
          <el-select v-model="currentLocale" @change="updateLocale">
            <el-option value="en" label="English"></el-option>
            <el-option value="zh" label="中文"></el-option>
            <el-option value="es" label="Español"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <label>Background Color:</label>
          <el-color-picker v-model="backgroundColor"></el-color-picker>
        </el-col>
        <el-col :span="8">
          <el-button @click="clearAllFilters" type="danger" size="small">
            Clear All Filters
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- Direct Options Example -->
    <div class="demo-section">
      <h3>📋 Direct Options Example:</h3>
      <p>Pre-defined list of options (no search needed)</p>
      <DropdownFilter
        column-prop="category"
        column-label="Category" 
        :direct-options="directOptions"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        :selected-filters="selectedCategories"
        @filter-change="onFilterChange"
      />
    </div>

    <!-- Remote Search Example -->
    <div class="demo-section">
      <h3>🔍 Remote Search Example:</h3>
      <p>Dynamic search with API simulation (type to search users)</p>
      <DropdownFilter
        column-prop="user"
        column-label="User"
        :remote-search-fn="remoteSearch"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        :selected-filters="selectedUsers"
        @filter-change="onFilterChange"
      />
    </div>

    <!-- Pre-selected Filters Example -->
    <div class="demo-section">
      <h3>✅ Pre-selected Filters Example:</h3>
      <p>Component with some filters already selected</p>
      <DropdownFilter
        column-prop="status"
        column-label="Status"
        :direct-options="statusOptions"
        :background-color="backgroundColor"
        :locale="currentLocale"
        :custom-messages="customMessages"
        :selected-filters="selectedStatuses"
        @filter-change="onFilterChange"
      />
    </div>

    <!-- Filter Results Display -->
    <div class="results-section">
      <h3>📊 Current Filter State:</h3>
      <el-card>
        <div slot="header" class="clearfix">
          <span>Applied Filters</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllFilters">
            Clear All
          </el-button>
        </div>
        <div v-if="hasActiveFilters">
          <el-row :gutter="10" v-for="(values, prop) in currentFilters" :key="prop">
            <el-col :span="6"><strong>{{ getFilterLabel(prop) }}:</strong></el-col>
            <el-col :span="18">
              <el-tag 
                v-for="value in values" 
                :key="value" 
                closable 
                @close="removeFilter(prop, value)"
                style="margin-right: 5px; margin-bottom: 5px;"
              >
                {{ value }}
              </el-tag>
            </el-col>
          </el-row>
        </div>
        <div v-else class="no-filters">
          <i class="el-icon-info"></i> No filters applied
        </div>
      </el-card>
      
      <!-- Raw Data Display -->
      <details style="margin-top: 20px;">
        <summary>🔧 Raw Filter Data (for developers)</summary>
        <pre>{{ JSON.stringify(currentFilters, null, 2) }}</pre>
      </details>
    </div>
  </div>
</template>

<script>
import DropdownFilter from '../src/components/DropdownFilter.vue'

export default {
  name: 'App',
  components: {
    DropdownFilter
  },
  data() {
    return {
      currentFilters: {},
      currentLocale: 'en',
      backgroundColor: '#ffffff',
      
      // Filter data
      directOptions: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
      statusOptions: ['Active', 'Inactive', 'Pending', 'Archived'],
      
      // Pre-selected filters to demonstrate the feature
      selectedCategories: [],
      selectedUsers: [],
      selectedStatuses: ['Active', 'Pending'], // Pre-select some statuses
      
      // Custom i18n messages
      customMessages: {
        en: {
          search: 'Search...',
          selectAll: 'Select All',
          clear: 'Clear',
          apply: 'Apply',
          cancel: 'Cancel',
          noOptions: 'No options found',
          optionsCount: '{count} options',
          loadingError: 'Failed to load {label} options'
        },
        zh: {
          search: '搜索...',
          selectAll: '全选',
          clear: '清空',
          apply: '应用',
          cancel: '取消',
          noOptions: '没有找到选项',
          optionsCount: '{count} 个选项',
          loadingError: '加载 {label} 选项失败'
        },
        es: {
          search: 'Buscar...',
          selectAll: 'Seleccionar Todo',
          clear: 'Limpiar',
          apply: 'Aplicar',
          cancel: 'Cancelar',
          noOptions: 'No se encontraron opciones',
          optionsCount: '{count} opciones',
          loadingError: 'Error al cargar opciones de {label}'
        }
      }
    }
  },
  computed: {
    hasActiveFilters() {
      return Object.keys(this.currentFilters).some(key => 
        this.currentFilters[key] && this.currentFilters[key].length > 0
      )
    }
  },
  methods: {
    onFilterChange(data) {
      console.log('Filter changed:', data)
      this.currentFilters = {
        ...this.currentFilters,
        [data.columnProp]: data.values
      }
      
      // Update corresponding selected arrays for reactivity
      if (data.columnProp === 'category') {
        this.selectedCategories = [...data.values]
      } else if (data.columnProp === 'user') {
        this.selectedUsers = [...data.values]
      } else if (data.columnProp === 'status') {
        this.selectedStatuses = [...data.values]
      }
    },
    
    async remoteSearch(keyword) {
      console.log('Remote search for:', keyword)
      // Simulate API call with loading delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const mockData = [
        'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson',
        'David Lee', 'Emma Davis', 'Frank Miller', 'Grace Taylor', 'Henry Zhang',
        'Isabella Garcia', 'Jack Thompson', 'Kate Rodriguez', 'Liam Anderson', 'Maya Patel'
      ]
      
      return mockData.filter(name => 
        name.toLowerCase().includes(keyword.toLowerCase())
      )
    },
    
    updateLocale(newLocale) {
      this.currentLocale = newLocale
      console.log('Locale changed to:', newLocale)
    },
    
    clearAllFilters() {
      this.currentFilters = {}
      this.selectedCategories = []
      this.selectedUsers = []
      this.selectedStatuses = []
      console.log('All filters cleared')
    },
    
    removeFilter(columnProp, value) {
      if (this.currentFilters[columnProp]) {
        const index = this.currentFilters[columnProp].indexOf(value)
        if (index > -1) {
          this.currentFilters[columnProp].splice(index, 1)
          
          // Update corresponding selected arrays
          if (columnProp === 'category') {
            const catIndex = this.selectedCategories.indexOf(value)
            if (catIndex > -1) this.selectedCategories.splice(catIndex, 1)
          } else if (columnProp === 'user') {
            const userIndex = this.selectedUsers.indexOf(value)
            if (userIndex > -1) this.selectedUsers.splice(userIndex, 1)
          } else if (columnProp === 'status') {
            const statusIndex = this.selectedStatuses.indexOf(value)
            if (statusIndex > -1) this.selectedStatuses.splice(statusIndex, 1)
          }
        }
      }
    },
    
    getFilterLabel(columnProp) {
      const labels = {
        category: 'Category',
        user: 'User',
        status: 'Status'
      }
      return labels[columnProp] || columnProp
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

.controls-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.controls-section h3 {
  margin-top: 0;
  color: #409eff;
}

.controls-section label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #606266;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: white;
}

.demo-section h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.demo-section p {
  color: #606266;
  margin-bottom: 15px;
  font-style: italic;
}

.results-section {
  margin-top: 40px;
}

.results-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.no-filters {
  text-align: center;
  color: #909399;
  padding: 20px;
  font-style: italic;
}

.no-filters i {
  margin-right: 8px;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  border: 1px solid #e4e7ed;
}

details {
  margin-top: 10px;
}

summary {
  cursor: pointer;
  padding: 10px;
  background: #f0f9ff;
  border-radius: 4px;
  border: 1px solid #b3d8ff;
  color: #409eff;
  font-weight: 600;
}

summary:hover {
  background: #e1f5fe;
}

/* Element UI component spacing adjustments */
.el-row {
  margin-bottom: 15px;
}

.el-tag {
  margin: 2px 4px 2px 0;
}

.el-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
