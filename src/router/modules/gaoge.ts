import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/gaoge',
  name: 'gaoge',
  meta: {
    title: '高歌FC',
    hidden: true,
    cacheable: true,
    icon: 'lucide:star',
  },
  children: [
    {
      path: 'home',
      name: 'gaogeHome',
      component: () => import('@/views/gaoge/home.vue'),
      meta: {
        title: '首页',
        hidden: true,
        breadcrumb: true,
      },
    },
  ],
}

export default routes
