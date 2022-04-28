import { createApp } from 'vue'
import App from './App.vue'
import message from '../../src'

const app = createApp(App)

app.use(message, '$message')
app.mount('#app')
