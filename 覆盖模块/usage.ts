import axios from 'axios'

async function run() {
  const service = axios.create({}) // AxiosInstance
  const p = service.get('https://api.github.com/users/defunkt') // AxiosPromise<any>
  p.then(res => {
    // 接口会被合并
    console.log(res.config, res.data, res.headers, res.status, res.statusText, res.code, res.message)
  })
}
