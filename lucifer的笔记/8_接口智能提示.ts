interface ResData {
  name: string
  count: number
}

// 记录接口名与返回数据类型
// 更好的方法是记录payload与返回类型
interface API {
  '/user': { name: string; role: string }
  '/data': { data: ResData }
}

const api = <U extends keyof API>(url: U): Promise<API[U]> => {
  return fetch(url).then(res => res.json())
}

api('/data').then(res => console.log(res.data.name))

export {}
