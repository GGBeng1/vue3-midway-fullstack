import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'
import layouts from '@/views/layouts/index.vue'

type RouteComponentInstance = Component | (() => Promise<Component>)
type LayoutComponent = Record<RouteComponent, RouteComponentInstance>

// 将路由数据转义为符合vue-router的格式
export const transRoutes = (routes: Route[]): RouteRecordRaw[] => {
  const resultRoute: RouteRecordRaw[] = []
  routes.forEach(route => {
    const itemRoute = { ...route } as unknown as RouteRecordRaw
    if (route.component) {
      itemRoute.component = getComponent(route.component, route.name)
    }
    if (route.children) {
      itemRoute.children = transRoutes(route.children)
    }
    resultRoute.push(itemRoute)
  })
  return resultRoute
}
function getComponent(
  name: RouteComponent,
  path: string,
): RouteComponentInstance {
  const componentList: LayoutComponent = {
    basic: layouts,
    self: () => import(`@/views/${path}/index.vue`),
  }
  return componentList[name]
}
