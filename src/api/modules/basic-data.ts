import { downloadFile } from '@/utils/downloader'
import api from '../index'

const BASE_PATH = '/api/cx/h5'

export default {
  // 获取支持电话
  getHelpListApi: () => api.get(`${BASE_PATH}/help/list`, {
    noAuth: true,
  }),

  // 文件下载功能
  getHelpFile: async (params?: any) => {
    downloadFile(`${BASE_PATH}/help/download`, '帮助文档.doc', {
      noAuth: true,
      params,
    })
  },

  // 获取列表
  getListApi: (path: string, data: object) => api.post(`${BASE_PATH}/${path}/list`, data, {
    noAuth: true,
    rawResponse: true,
  }),

  // 获取详情
  getDetailByQydmApi: (data: object) => api.post(`${BASE_PATH}/syscqyinfo/detail`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    noAuth: true,
    rawResponse: true,
  }),

  // 获取详情-通过批准文号查询
  getDetailByPzwhApi: (data: object) => api.get(`${BASE_PATH}/sycppzwh/detail`, {
    params: data,
    noAuth: true,
  }),
}
