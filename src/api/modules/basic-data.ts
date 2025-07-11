import api from '../index'

const BASE_PATH = '/cx/api/cx/h5/'

export default {
  // 获取支持电话
  getHelpListApi: () => api.get(`${BASE_PATH}/help/list`, {
    noAuth: true,
  }),

  // 获取列表
  getListApi: (path: string, data: object) => api.post(`${BASE_PATH}${path}/list`, data, {
    noAuth: true,
    rawResponse: true,
  }),

  // 获取详情
  getDetailApi: () => api.get('basic/detail', {
    baseURL: '/mock/',
  }),
}
