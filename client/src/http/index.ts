// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showLoading, closeLoading } from '@/utils'
import { useUserInfoStore } from '@/stores/userInfo'
interface constomerConfig<D = any> extends AxiosRequestConfig {
  loading?: boolean
  loadingText?: string
  errorTip?: boolean
  data?: D
}
interface constomerAxiosResponse<T = any, D = any> extends AxiosResponse {
  data: T
  config: constomerConfig<D>
}
// 导出Request类
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '/v1', timeout: 60000 }
  constructor(newConfig: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, newConfig))

    this.instance.interceptors.request.use(
      (config: constomerConfig) => {
        // 设置loading
        if (config?.loading !== false) {
          showLoading(config?.loadingText || '加载中...')
        }
        // 请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem('token') as string
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err)
      },
    )

    this.instance.interceptors.response.use(
      (res: constomerAxiosResponse) => {
        if (res.config.loading !== false) {
          setTimeout(() => {
            closeLoading()
          }, 200)
        }
        if (res.data.code !== '10200' && res.config.errorTip !== false) {
          ElMessage({
            showClose: true,
            message: `${res.data.message}`,
            type: 'error',
          })
        }
        return res
      },
      (err: any) => {
        if (err?.config?.loading !== false) {
          setTimeout(() => {
            closeLoading()
          }, 200)
        }
        // 处理http常见错误，进行全局提示
        if (err?.config?.errorTip !== false) {
          const store = useUserInfoStore()
          let message = ''
          switch (err.response.status) {
            case 400:
              message = '请求错误(400)'
              break
            case 401:
              message = '未授权，请重新登录(401)'
              store.ClearAuthState()
              break
            case 403:
              message = '拒绝访问(403)'
              break
            case 404:
              message = '请求出错(404)'
              break
            case 408:
              message = '请求超时(408)'
              break
            case 500:
              message = '服务器错误(500)'
              break
            case 501:
              message = '服务未实现(501)'
              break
            case 502:
              message = '网络错误(502)'
              break
            case 503:
              message = '服务不可用(503)'
              break
            case 504:
              message = '网络超时(504)'
              break
            case 505:
              message = 'HTTP版本不受支持(505)'
              break
            default:
              message = `连接出错(${err.response.status})!`
          }
          ElMessage({
            showClose: true,
            message: `${err.message || message}，请检查网络或联系管理员！`,
            type: 'error',
          })
        }
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response)
      },
    )
  }

  // 定义请求方法
  public async request(config: constomerConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public async get<T = any>(
    url: string,
    params?: object,
    config?: constomerConfig,
  ): Promise<AxiosResponse<ApiRequest.Result<T>>> {
    return this.instance({ url, params, ...config, method: 'get' })
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: constomerConfig,
  ): Promise<AxiosResponse<ApiRequest.Result<T>>> {
    return this.instance.post(url, data, config)
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: constomerConfig,
  ): Promise<AxiosResponse<ApiRequest.Result<T>>> {
    return this.instance.put(url, data, config)
  }

  public async delete<T = any>(
    url: string,
    params?: object,
    config?: constomerConfig,
  ): Promise<AxiosResponse<ApiRequest.Result<T>>> {
    return this.instance({ url, params, ...config, method: 'delete' })
  }
}

// 默认导出Request实例
export default new Request({})
