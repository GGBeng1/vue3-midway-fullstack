import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'uno.css'
import App from './App.vue'
import { setupRouter } from './router'
import '@/common/css/index.scss'

async function setupApp() {
  const app = createApp(App)
  app.use(createPinia())
  await setupRouter(app)
  app.mount('#app')
}
setupApp()
