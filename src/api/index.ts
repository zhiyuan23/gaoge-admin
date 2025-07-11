import useUserStore from '@/store/modules/user'
import axios from 'axios'
// import qs from 'qs'
import { toast } from 'vue-sonner'

const api = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY) ? '/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

declare module 'axios' {
  interface AxiosRequestConfig {
    noAuth?: boolean
    rawResponse?: boolean
  }
}

api.interceptors.request.use(
  (request) => {
    // 全局拦截请求发送前提交的参数
    const userStore = useUserStore()

    // 设置请求头
    if (request.headers) {
      if (!request.noAuth && userStore.isLogin) {
        request.headers.Token = userStore.token
      }
    }

    // 是否将 POST 请求参数进行字符串化处理
    // if (request.method === 'post') {
    //   request.data = qs.stringify(request.data, {
    //     arrayFormat: 'brackets',
    //   })
    // }
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ code: 1, errMsg: '', data: {} }
     * 规则是当 code 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 errMsg 会返回错误信息
     */
    if (response.config.rawResponse) {
      return Promise.resolve(response)
    }
    if (response.data.code === 0) {
      if (response.data.errMsg !== '') {
        toast.warning('Warning', {
          description: response.data.errMsg,
        })
        return Promise.reject(response.data)
      }
    }
    else {
      useUserStore().requestLogout()
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    if (error.code === 401) {
      useUserStore().requestLogout()
      throw error
    }
    let message = error.errMsg
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with code code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    toast.error('Error', {
      description: message,
    })
    return Promise.reject(error)
  },
)

export default api
