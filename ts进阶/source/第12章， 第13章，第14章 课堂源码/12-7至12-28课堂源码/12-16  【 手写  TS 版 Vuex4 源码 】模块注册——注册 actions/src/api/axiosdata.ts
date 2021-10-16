import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// 添加请求拦截器
// 在发送请求之前做些什么
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  //console.log("config:", config)
  return config;
})
// 添加响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
  // 对响应数据做点什么
  //console.log("response:", response)
  return response
}, err => {
  // 对响应错误做点什么
  return Promise.reject(err);
})
axios.defaults.withCredentials = true;
let axiosRequest = (method: any, url: any, data: any, headers: any) => {
  method = method.toUpperCase();
  if (method === "GET") {
    data = undefined
  }
  //let myheaders = { ...headers, 'Accept': 'application/json' };
  //console.log("refresh:", myheaders);
  console.log("refresh:", headers);

  return axios({
    method: method,
    url: url,
    data: data || '',
    withCredentials: true,
    //headers: myheaders
    headers
  })
}

//let get = (url: any): Promise<any> => {
let get = (url: any) => {
  return axiosRequest('GET', url, undefined,
    { 'content-type': 'application/json', 'Accept': 'application/json' })
};//查询
let post = (url: any, data: any) => { return axiosRequest('POST', url, data, { 'content-type': 'application/json', 'Accept': 'application/json' }) };//添加
let put = (url: any, data: any) => { return axiosRequest('PUT', url, data, { 'content-type': 'application/json', 'Accept': 'application/json' }) };//更新
let del = (url: any) => { return axiosRequest('DELETE', url, undefined, { 'content-type': 'application/json', 'Accept': 'application/json' }) }


export { get, post, put, del }

