// Simple i18n utility for component localization
export const DEFAULT_LOCALE = 'en'

export const LOCALES = {
  en: {
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