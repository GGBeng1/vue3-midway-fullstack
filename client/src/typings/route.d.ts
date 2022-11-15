/**
 * 路由的组件
 * - basic - 基础布局，具有公共部分的布局
 * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
 */
type RouteComponent = 'basic' | 'self'

/** 路由描述 */
interface RouteMeta {
  /** 路由标题(可用来作document.title或者菜单的名称) */
  title: string
  /** 作为单级路由的父级路由布局组件 */
  singleLayout?: Extract<RouteComponent, 'basic' | 'blank'>
  /** 需要登录权限 */
  requiresAuth?: boolean
  /** 缓存页面 */
  keepAlive?: boolean
  /** 菜单和面包屑对应的图标(iconify图标名称) */
  icon?: string
  /** 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中) */
  hide?: boolean
  /** 外链链接 */
  href?: string
  /** 路由顺序，可用于菜单的排序 */
  order?: number
  /** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
  multi?: boolean
}

/** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
interface Route {
  /** 路由名称(路由唯一标识) */
  name: string
  /** 路由路径 */
  path: string
  /** 路由重定向 */
  redirect?: string
  /**
   * 路由组件
   * - basic: 基础布局，具有公共部分的布局
   * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  component?: RouteComponent
  /** 子路由 */
  children?: Route[]
  /** 路由描述 */
  meta: RouteMeta
  /** 路由属性 */
  props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
}
