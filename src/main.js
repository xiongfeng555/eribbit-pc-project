import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './assets/styles/element-pluu.scss'
import UI from '@/components/library'
import '@/mock'

createApp(App).use(store).use(router).use(ElementPlus).use(UI).mount('#app')
