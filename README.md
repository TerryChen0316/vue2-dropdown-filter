# @terry0316/vue2-dropdown-filter

🔽 A reusable Vue 2 + Element-UI dropdown filter component with remote search, direct options, i18n, and eventBus (PubSub.js) support.

## ✅ Features

- ✅ `directOptions` mode or `remoteSearchFn` dynamic search
- ✅ i18n locale support
- ✅ PubSub.js for apply/cancel event broadcasting
- ✅ "Select All", "Clear All", and "Apply/Cancel" actions

## 📦 Installation

```bash
npm install @terry0316/vue2-dropdown-filter pubsub-js
```

## 🛠 Usage

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DropdownFilter from '@terry0316/vue2-dropdown-filter'

Vue.use(ElementUI)
Vue.component('DropdownFilter', DropdownFilter)
```

## 💡 Props

| Prop            | Type     | Required | Description                        |
|-----------------|----------|----------|------------------------------------|
| `key`           | String   | ✔        | Unique identifier for PubSub       |
| `label`         | String   | ✔        | Display label                      |
| `selectedFilters` | Array | ✔        | Selected filters (v-model style)   |
| `remoteSearchFn` | Function | ✘      | Async search function              |
| `directOptions` | Array    | ✔        | If non-empty, disables remoteSearch|
| `locale`        | Object   | ✘        | i18n support                       |

## 🔬 Test

```bash
npm install
npm run test
```

## 📜 License

MIT
