import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. استيراد Pinia
import App from './App.vue'
import router from './router'
import './style.css'
const app = createApp(App)
const pinia = createPinia() // 2. إنشاء النسخة

app.use(pinia)   // 3. تفعيل Pinia أولاً (مهم جداً!)
app.use(router)  // 4. ثم تفعيل الـ Router

app.mount('#app')