import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/basic_data',
  redirect: '/basic_data/index',
  name: 'basicData',
  meta: {
    title: '基础数据管理',
    hidden: true,
    cacheable: true,
    icon: 'i-ep:document',
  },
  children: [
    {
      path: 'index',
      name: 'basicDataIndex',
      component: () => import('@/views/basic_data/index.vue'),
      meta: {
        title: '基础数据',
        hidden: true,
        breadcrumb: true,
      },
    },
    {
      path: 'list',
      name: 'basicDataList',
      component: () => import('@/views/basic_data/list.vue'),
      meta: {
        title: '查询列表',
        hidden: true,
        breadcrumb: true,
      },
    },
    {
      path: 'detail',
      name: 'basicDataDetail',
      component: () => import('@/views/basic_data/detail.vue'),
      meta: {
        title: '数据详情',
        menu: false,
        hidden: true,
        breadcrumb: false,
      },
    },
  ],
}

export default routes
