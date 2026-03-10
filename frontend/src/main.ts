import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vMaska } from 'maska/vue'

const app = createApp(App)
app.directive('maska', vMaska)
app.mount('#app')