import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'
import { cloneDeep } from 'es-toolkit'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    mode: 'head',
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  topbar: {
    mode: 'fixed',
  },
  tabbar: {
    enable: true,
    enableIcon: true,
    enableHotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  copyright: {
    enable: true,
    dates: '2025-present',
    company: 'Gaoge-admin',
    website: '',
  },
}

export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
