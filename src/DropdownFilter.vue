<template>
  <div>
    <el-dropdown>
      <el-button>{{ label }}</el-button>
      <el-dropdown-menu slot="dropdown">
        <div v-if="showSearch">
          <el-input
            placeholder="Search"
            v-model="keyword"
            @input="onSearch"
          />
        </div>
        <el-checkbox-group v-model="internalSelected">
          <el-checkbox
            v-for="item in options"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
        <div>
          <el-button @click="selectAllOptions">{{ i18nText.selectAll }}</el-button>
          <el-button @click="clearAllOptions">{{ i18nText.clearAll }}</el-button>
        </div>
        <div>
          <el-button @click="handleCancel">{{ i18nText.cancel }}</el-button>
          <el-button type="primary" @click="handleApply">{{ i18nText.apply }}</el-button>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import defaultLocale from '../i18n'

export default {
  name: 'DropdownFilter',
  props: {
    key: { type: String, required: true },
    label: { type: String, required: true },
    selectedFilters: { type: Array, required: true },
    remoteSearchFn: { type: Function, default: null },
    directOptions: { type: Array, default: () => [] },
    locale: { type: Object, default: () => defaultLocale.en }
  },
  data() {
    return {
      keyword: '',
      options: [],
      internalSelected: []
    }
  },
  computed: {
    i18nText() {
      return Object.assign({}, defaultLocale.en, this.locale || {})
    },
    showSearch() {
      return this.directOptions.length === 0
    }
  },
  watch: {
    selectedFilters: {
      handler(newVal) {
        this.internalSelected = [...newVal]
      },
      immediate: true
    }
  },
  methods: {
    async onSearch() {
      if (this.remoteSearchFn && this.keyword) {
        this.options = await this.remoteSearchFn(this.keyword)
      }
    },
    selectAllOptions() {
      this.internalSelected = this.options.map(o => o.value)
    },
    clearAllOptions() {
      this.internalSelected = []
    },
    handleCancel() {
      this.internalSelected = [...this.selectedFilters]
      PubSub.publish(`dropdownFilter:${this.key}:cancel`)
    },
    handleApply() {
      this.$emit('update:selectedFilters', this.internalSelected)
      PubSub.publish(`dropdownFilter:${this.key}:apply`, this.internalSelected)
    }
  }
}
</script>
