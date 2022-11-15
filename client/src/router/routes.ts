const routes: Route[] = [
  {
    path: '/',
    component: 'basic',
    meta: {
      title: '首页',
    },
    name: 'layout',
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        meta: {
          title: '欢迎页',
        },
        path: 'welcome',
        component: 'self',
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: 'self',
  },
]
export default routes
