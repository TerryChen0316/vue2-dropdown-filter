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
    
    // Languages
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文',
    japanese: '日本語',
    
    // DropdownFilter
    search: 'Search...',
    optionsCount: '{count} options',
    selectAll: 'Select All',
    clear: 'Clear',
    noOptions: 'No options found',
    apply: 'Apply',
    loadingError: 'Failed to load {label} options',
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
    
    // Languages
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文',
    japanese: '日本語',
    
    // DropdownFilter
    search: '搜尋...',
    optionsCount: '{count} 個選項',
    selectAll: '全選',
    clear: '清除',
    noOptions: '找不到選項',
    apply: '套用',
    loadingError: '載入 {label} 選項失敗',
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
    
    // Languages
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文',
    japanese: '日本語',
    
    // DropdownFilter
    search: '搜索...',
    optionsCount: '{count} 个选项',
    selectAll: '全选',
    clear: '清除',
    noOptions: '未找到选项',
    apply: '应用',
    loadingError: '加载 {label} 选项失败',
    
    // FloatingFilterPanel
    filters: '筛选器',
    filterPanel: '筛选面板',
    activeFilters: '活动筛选器',
    searchPlaceholder: '搜索 {label}...'
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
    
    // Languages
    english: 'English',
    traditionalChinese: '繁體中文',
    simplifiedChinese: '简体中文',
    japanese: '日本語',
    
    // DropdownFilter
    search: '検索...',
    optionsCount: '{count} 個のオプション',
    selectAll: 'すべて選択',
    clear: 'クリア',
    noOptions: 'オプションが見つかりません',
    apply: '適用',
    loadingError: '{label} オプションの読み込みに失敗しました',
    
    // FloatingFilterPanel
    filters: 'フィルター',
    filterPanel: 'フィルターパネル',
    activeFilters: 'アクティブフィルター',
    searchPlaceholder: '{label} を検索...'
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