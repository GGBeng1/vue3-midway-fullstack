import type { Router } from 'vue-router'

export async function setPermission(router: Router) {
  const whitePath: string[] = ['/login']
  router.beforeEach((to, form, next) => {
    window.$loadingBar?.start()
    const token = localStorage.getItem('token') as string
    if (token) {
      next()
    } else {
      if (whitePath.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  })
  router.afterEach(() => {
    window.$loadingBar?.finish()
  })
}
