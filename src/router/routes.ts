import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import useSettingsStore from '@/store/modules/settings'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import BasicData from './modules/basic.data'
import BreadcrumbExample from './modules/example/breadcrumb.example'
import ComponentExample from './modules/example/component.example'
import ExternalLinkExample from './modules/example/external.link.example'
import FeatureExample from './modules/example/feature.example'
import IconExample from './modules/example/icon.example'
import JsxExample from './modules/example/jsx.example'
import KeepAliveExample from './modules/example/keep.alive.example'
import MockExample from './modules/example/mock.example'
import MultilevelMenuExample from './modules/example/multilevel.menu.example'
import PermissionExample from './modules/example/permission.example'
import PluginExample from './modules/example/plugin.example'
import TabExample from './modules/example/tab.example'
import Gaoge from './modules/gaoge'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '高歌',
      icon: 'solar:cup-star-outline',
    },
    children: [
      Gaoge,
    ],
  },
  {
    meta: {
      title: '高歌FC',
      icon: 'ion:football',
    },
    children: [
      Gaoge,
    ],
  },
  {
    meta: {
      title: '演示',
      icon: 'i-uim:box',
    },
    children: [
      MultilevelMenuExample,
      BreadcrumbExample,
      KeepAliveExample,
      TabExample,
      ComponentExample,
      IconExample,
      FeatureExample,
      PluginExample,
      PermissionExample,
      MockExample,
      JsxExample,
      ExternalLinkExample,
    ],
  },
  {
    meta: {
      title: '国家兽药',
      icon: 'i-ci:main-component',
    },
    children: [
      BasicData,
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))

export {
  asyncRoutes,
  asyncRoutesByFilesystem,
  constantRoutes,
  constantRoutesByFilesystem,
  systemRoutes,
}
