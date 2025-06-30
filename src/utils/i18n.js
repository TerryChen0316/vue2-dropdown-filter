// Simple i18n utility for component localization
export const DEFAULT_LOCALE = 'en'

export const LOCALES = {
  en: {
    // App.vue
    appTitle: 'Advanced Table with Filters',
    appDescription: 'Vue 2 + Element UI demonstration with remote filtering, sorting, and pagination',
    displayControls: 'Display Controls',
    showFilterCount: 'Show Filter Count',
    hideFilterCount: 'Hide Filter Count',
    showActiveFilters: 'Show Active Filters',
    hideActiveFilters: 'Hide Active Filters',
    showPagination: 'Show Pagination',
    hidePagination: 'Hide Pagination',
    useFloatingFilters: 'Use Floating Filters',
    useInlineFilters: 'Use Inline Filters',
    i18nCustomization: 'i18n & Customization Controls',
    language: 'Language:',
    theme: 'Theme:',
    useDefaultStyles: 'Use Default Styles',
    useCustomStyles: 'Use Custom Styles',
    languageChanged: 'Language changed to: {locale}',
    themeChanged: 'Theme changed to: {theme}',
    customStylesEnabled: 'Custom styles enabled',
    customStylesDisabled: 'Custom styles disabled',
    demoActions: 'Demo Actions',
    resetAllFilters: 'Reset All Filters',
    refreshData: 'Refresh Data',
    exportCurrentFilters: 'Export Current Filters',
    importSampleFilters: 'Import Sample Filters',
    currentFilterState: 'Current Filter State',
    eventLog: 'Event Log (PubSub Communication)',
    clearLog: 'Clear Log',
    enableLogging: 'Enable Logging',
    disableLogging: 'Disable Logging',
    noEventsLogged: 'No events logged yet...',
    dataRefreshed: 'Data refreshed successfully',
    filtersExported: 'Filters exported successfully',
    sampleFiltersImported: 'Sample filters imported successfully',
    editUser: 'Editing user: {name}',
    confirmDelete: 'Are you sure you want to delete {name}?',
    confirmDeleteTitle: 'Confirm Delete',
    delete: 'Delete',
    cancel: 'Cancel',
    userDeleted: '{name} has been deleted',
    deleteCancelled: 'Delete cancelled',
    loadDataError: 'Failed to load data',
    
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
    
    // Themes
    default: 'Default',
    dark: 'Dark',
    colorful: 'Colorful',
    minimal: 'Minimal',
    
    // ActiveFilters
    filterCount: '{count} filters applied',
    clearAll: 'Clear All',
    
    // FilterDropdown
    search: 'Search...',
    optionsCount: '{count} options',
    selectAll: 'Select All',
    clear: 'Clear',
    noOptions: 'No options found',
    apply: 'Apply',
    loadingError: 'Failed to load {label} options',
    
    // FloatingFilterPanel
    filters: 'Filters',
    filterPanel: 'Filter Panel',
    activeFilters: 'Active Filters',
    searchPlaceholder: 'Search {label}...'
  },
  'zh-TW': {
    // App.vue
    appTitle: '進階表格與篩選器',
    appDescription: 'Vue 2 + Element UI 遠端篩選、排序和分頁示範',
    displayControls: '顯示控制',
    showFilterCount: '顯示篩選計數',
    hideFilterCount: '隱藏篩選計數',
    showActiveFilters: '顯示作用中篩選器',
    hideActiveFilters: '隱藏作用中篩選器',
    showPagination: '顯示分頁',
    hidePagination: '隱藏分頁',
    useFloatingFilters: '使用浮動篩選器',
    useInlineFilters: '使用內嵌篩選器',
    i18nCustomization: '國際化與客製化控制',
    language: '語言：',
    theme: '主題：',
    useDefaultStyles: '使用預設樣式',
    useCustomStyles: '使用自訂樣式',
    languageChanged: '語言已變更為：{locale}',
    themeChanged: '主題已變更為：{theme}',
    customStylesEnabled: '自訂樣式已啟用',
    customStylesDisabled: '自訂樣式已停用',
    demoActions: '示範操作',
    resetAllFilters: '重設所有篩選器',
    refreshData: '重新整理資料',
    exportCurrentFilters: '匯出目前篩選器',
    importSampleFilters: '匯入範例篩選器',
    currentFilterState: '目前篩選狀態',
    eventLog: '事件記錄（PubSub 通訊）',
    clearLog: '清除記錄',
    enableLogging: '啟用記錄',
    disableLogging: '停用記錄',
    noEventsLogged: '尚未記錄任何事件...',
    dataRefreshed: '資料重新整理成功',
    filtersExported: '篩選器匯出成功',
    sampleFiltersImported: '範例篩選器匯入成功',
    editUser: '編輯使用者：{name}',
    confirmDelete: '您確定要刪除 {name} 嗎？',
    confirmDeleteTitle: '確認刪除',
    delete: '刪除',
    cancel: '取消',
    userDeleted: '{name} 已被刪除',
    deleteCancelled: '刪除已取消',
    loadDataError: '載入資料失敗',
    
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
    
    // Themes
    default: '預設',
    dark: '深色',
    colorful: '彩色',
    minimal: '簡約',
    
    // ActiveFilters
    filterCount: '{count} 個篩選條件',
    clearAll: '清除全部',
    
    // FilterDropdown
    search: '搜尋...',
    optionsCount: '{count} 個選項',
    selectAll: '全選',
    clear: '清除',
    noOptions: '找不到選項',
    apply: '套用',
    loadingError: '載入 {label} 選項失敗',
    
    // FloatingFilterPanel
    filters: '篩選器',
    filterPanel: '篩選面板',
    activeFilters: '作用中篩選器',
    searchPlaceholder: '搜尋 {label}...'
  },
  'zh-CN': {
    // App.vue
    appTitle: '高级表格与筛选器',
    appDescription: 'Vue 2 + Element UI 远程筛选、排序和分页演示',
    displayControls: '显示控制',
    showFilterCount: '显示筛选计数',
    hideFilterCount: '隐藏筛选计数',
    showActiveFilters: '显示活动筛选器',
    hideActiveFilters: '隐藏活动筛选器',
    showPagination: '显示分页',
    hidePagination: '隐藏分页',
    useFloatingFilters: '使用浮动筛选器',
    useInlineFilters: '使用内联筛选器',
    i18nCustomization: '国际化与自定义控制',
    language: '语言：',
    theme: '主题：',
    useDefaultStyles: '使用默认样式',
    useCustomStyles: '使用自定义样式',
    languageChanged: '语言已更改为：{locale}',
    themeChanged: '主题已更改为：{theme}',
    customStylesEnabled: '自定义样式已启用',
    customStylesDisabled: '自定义样式已禁用',
    demoActions: '演示操作',
    resetAllFilters: '重置所有筛选器',
    refreshData: '刷新数据',
    exportCurrentFilters: '导出当前筛选器',
    importSampleFilters: '导入示例筛选器',
    currentFilterState: '当前筛选状态',
    eventLog: '事件日志（PubSub 通信）',
    clearLog: '清除日志',
    enableLogging: '启用日志',
    disableLogging: '禁用日志',
    noEventsLogged: '尚未记录任何事件...',
    dataRefreshed: '数据刷新成功',
    filtersExported: '筛选器导出成功',
    sampleFiltersImported: '示例筛选器导入成功',
    editUser: '编辑用户：{name}',
    confirmDelete: '您确定要删除 {name} 吗？',
    confirmDeleteTitle: '确认删除',
    delete: '删除',
    cancel: '取消',
    userDeleted: '{name} 已被删除',
    deleteCancelled: '删除已取消',
    loadDataError: '加载数据失败',
    
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
    
    // Themes
    default: '默认',
    dark: '深色',
    colorful: '彩色',
    minimal: '简约',
    
    // ActiveFilters
    filterCount: '{count} 个筛选条件',
    clearAll: '清除全部',
    
    // FilterDropdown
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
    // App.vue
    appTitle: '高度なテーブルとフィルター',
    appDescription: 'Vue 2 + Element UI リモートフィルタリング、ソート、ページネーションのデモ',
    displayControls: '表示コントロール',
    showFilterCount: 'フィルター数を表示',
    hideFilterCount: 'フィルター数を非表示',
    showActiveFilters: 'アクティブフィルターを表示',
    hideActiveFilters: 'アクティブフィルターを非表示',
    showPagination: 'ページネーションを表示',
    hidePagination: 'ページネーションを非表示',
    useFloatingFilters: 'フローティングフィルターを使用',
    useInlineFilters: 'インラインフィルターを使用',
    i18nCustomization: '国際化とカスタマイゼーション制御',
    language: '言語：',
    theme: 'テーマ：',
    useDefaultStyles: 'デフォルトスタイルを使用',
    useCustomStyles: 'カスタムスタイルを使用',
    languageChanged: '言語が変更されました：{locale}',
    themeChanged: 'テーマが変更されました：{theme}',
    customStylesEnabled: 'カスタムスタイルが有効になりました',
    customStylesDisabled: 'カスタムスタイルが無効になりました',
    demoActions: 'デモアクション',
    resetAllFilters: 'すべてのフィルターをリセット',
    refreshData: 'データを更新',
    exportCurrentFilters: '現在のフィルターをエクスポート',
    importSampleFilters: 'サンプルフィルターをインポート',
    currentFilterState: '現在のフィルター状態',
    eventLog: 'イベントログ（PubSub通信）',
    clearLog: 'ログをクリア',
    enableLogging: 'ログを有効化',
    disableLogging: 'ログを無効化',
    noEventsLogged: 'まだイベントがログされていません...',
    dataRefreshed: 'データの更新が成功しました',
    filtersExported: 'フィルターのエクスポートが成功しました',
    sampleFiltersImported: 'サンプルフィルターのインポートが成功しました',
    editUser: 'ユーザーを編集：{name}',
    confirmDelete: '{name} を削除してもよろしいですか？',
    confirmDeleteTitle: '削除の確認',
    delete: '削除',
    cancel: 'キャンセル',
    userDeleted: '{name} が削除されました',
    deleteCancelled: '削除がキャンセルされました',
    loadDataError: 'データの読み込みに失敗しました',
    
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
    
    // Themes
    default: 'デフォルト',
    dark: 'ダーク',
    colorful: 'カラフル',
    minimal: 'ミニマル',
    
    // ActiveFilters
    filterCount: '{count} 個のフィルター',
    clearAll: 'すべてクリア',
    
    // FilterDropdown
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