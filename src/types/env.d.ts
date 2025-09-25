/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Auto generate by env-parse
  /**
   * 应用配置面板
   */
  readonly VITE_APP_TITLE: string
  /**
   * API 通用前缀
   */
  readonly VITE_APP_API_PREFIX: string
  /**
   * 静态资源前缀
   */
  readonly VITE_APP_PDF_PREFIX: string
  readonly VITE_APP_IMAGE_PREFIX: string
  readonly VITE_APP_DOC_PREFIX: string
  /**
   * 调试工具
   */
  readonly VITE_APP_DEBUG_TOOL: string
  /**
   * 禁用开发者工具（默认关闭）
   */
  readonly VITE_APP_DISABLE_DEVTOOL: boolean
  /**
   * 构建配置（默认关闭）
   */
  readonly VITE_BUILD_MOCK: boolean
  readonly VITE_BUILD_SOURCEMAP: boolean
  readonly VITE_BUILD_COMPRESS: string
  readonly VITE_BUILD_ARCHIVE: string
  /**
   * ========================
   * UAT 环境配置
   * ========================
   */
  readonly VITE_APP_SETTING: boolean
  /**
   * 服务端地址（UAT）
   */
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_STATIC_RESOURCE_URL: string
}
