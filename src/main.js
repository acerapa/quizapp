import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as jQuery from 'jquery'

const app = createApp(App)
app.use(createPinia())

// before each route change, set the page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Quiz App'
  next()
})

window.jQuery = jQuery;

app.use(router)

app.mount('#app')
