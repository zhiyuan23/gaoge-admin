import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
import { loadingFadeOut } from 'virtual:app-loading'

import { createRouter, createWebHashHistory } from 'vue-router'
import setupGuards from './guards'
// 路由相关数据
import { constantRoutes, constantRoutesByFilesystem } from './routes'

// 根据环境选择路由模式
// const isProduction = import.meta.env.PROD
// const historyMode = isProduction
//   ? createWebHistory() // 生产环境用 history 模式
//   : createWebHashHistory() // 开发环境用 hash 模式

const router = createRouter({
  history: createWebHashHistory(), // 动态注入模式
  routes: useSettingsStore(pinia).settings.app.routeBaseOn === 'filesystem'
    ? constantRoutesByFilesystem
    : constantRoutes,
})

setupGuards(router)

router.isReady().then(() => {
  loadingFadeOut()
})

export default router
