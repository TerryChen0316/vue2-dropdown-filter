// Simple i18n utility for component localization
export const DEFAULT_LOCALE = 'en'

export const LOCALES = {
  en: {
    // Table columns
    id: 'ID',
    name: 'Name',
    email: 'Email',
    department: 'Department',
    role: 'Role',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    
    // DropdownFilter
    apply: 'Apply',
    cancel: 'Cancel',
    clear: 'Clear',
    loadingError: 'Failed to load {label} options',
    noOptions: 'No options found',
    optionsCount: '{count} options',
    search: 'Search...',
    selectAll: 'Select All',
  },
  'zh-TW': {
    // Table columns
    id: 'ID',
    name: '姓名',
    email: '電子郵件',
    department: '部門',
    role: '職位',
    status: '狀態',
    actions: '操作',
    edit: '編輯',
    
    // DropdownFilter
    apply: '套用',
    cancel: '取消',
    clear: '清除',
    loadingError: '載入 {label} 選項失敗',
    noOptions: '找不到選項',
    optionsCount: '{count} 個選項',
    search: '搜尋...',
    selectAll: '全選',
  },
  'zh-CN': {
    // Table columns
    id: 'ID',
    name: '姓名',
    email: '邮箱',
    department: '部门',
    role: '职位',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    
    // DropdownFilter
    apply: '应用',
    cancel: '取消',
    clear: '清除',
    loadingError: '加载 {label} 选项失败',
    noOptions: '未找到选项',
    optionsCount: '{count} 个选项',
    search: '搜索...',
    selectAll: '全选',
  },
  ja: {
    // Table columns
    id: 'ID',
    name: '名前',
    email: 'メール',
    department: '部署',
    role: '役職',
    status: 'ステータス',
    actions: 'アクション',
    edit: '編集',
    
    // DropdownFilter
    apply: '適用',
    cancel: 'キャンセル',
    clear: 'クリア',
    loadingError: '{label} オプションの読み込みに失敗しました',
    noOptions: 'オプションが見つかりません',
    optionsCount: '{count} 個のオプション',
    search: '検索...',
    selectAll: 'すべて選択',
  }
}

export class I18n {
  constructor(locale = DEFAULT_LOCALE, customMessages = {}) {
    this.locale = locale
    this.messages = {
      ...LOCALES[locale] || LOCALES[DEFAULT_LOCALE],
      ...customMessages
    }
  }
  
  t(key, params = {}) {
    let message = this.messages[key] || key
    
    // Simple parameter replacement
    Object.keys(params).forEach(param => {
      const regex = new RegExp(`\\{${param}\\}`, 'g')
      message = message.replace(regex, params[param])
    })
    
    return message
  }
  
  setLocale(locale, customMessages = {}) {
    this.locale = locale
    this.messages = {
      ...LOCALES[locale] || LOCALES[DEFAULT_LOCALE],
      ...customMessages
    }
  }
  
  addMessages(messages) {
    this.messages = {
      ...this.messages,
      ...messages
    }
  }
}

// Default i18n instance
export const i18n = new I18n()

export default i18n