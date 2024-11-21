import type { AxiosPromise, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  /**
   * 覆盖 axios 默认的 AxiosResponse 类型
   * @see https://github.com/axios/axios/issues/1510#issuecomment-448201698
   */
  export interface AxiosResponse<T = any> {
    code: number
    data: T
    message: string
  }

  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise
    head(url: string, config?: AxiosRequestConfig): AxiosPromise
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  }
}
