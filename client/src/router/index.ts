import { createRouter, createWebHistory } from 'vue-router'
import { transRoutes } from '@/utils'
import { setPermission } from './permission'
import routes from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: transRoutes(routes),
})
await setPermission(router)

export default router
