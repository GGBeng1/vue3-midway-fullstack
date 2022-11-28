import { createRouter, createWebHistory } from 'vue-router'
import { transRoutes } from '@/utils'
import { setPermission } from './permission'
import routes from './routes'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: transRoutes(routes),
})
export const setupRouter = async (app: App) => {
  app.use(router)
  await setPermission(router)
  await router.isReady()
}
