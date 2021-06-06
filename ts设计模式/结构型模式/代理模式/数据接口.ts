// 代理模式 Proxy
// 特点：在对象前面加了一层，外部需要通过这层代理来操作原对象，代理可以加一些控制来过滤或简化操作。
// 用处：当对象不希望被外部直接访问时可以考虑代理模式，典型的有远程代理、保护代理、透明代理、虚拟代理等。
// 注意：与外观、装饰器模式的区别。
// 虚拟代理：做web页面时对图像经常使用虚拟代理，看不到的图像先用个统一的图像替代，页面滑到哪就加载到哪，省资源。

// 数据接口：
interface DataService {
  getData(): string | Promise<string>
}

// 在server端的远程服务：
class RemoteService implements DataService {
  getData() {
    return 'get remote data'
  }
}

// 假设一个Reqeuster类，可以取server端数据：
class Requester {
  Request() {
    return Promise.resolve(new RemoteService().getData()) //这里本来应该从网络取，现在只是演示一下
  }
}

// 本地代理：
class DataProxy implements DataService {
  async getData() {
    return await new Requester().Request()
  }
}

function isPromise(p: string | Promise<string>): p is Promise<string> {
  //用来判断是否是promise
  return (p as Promise<string>).then !== undefined
}

let dataService: DataService = new DataProxy()
let data = dataService.getData()

if (isPromise(data)) {
  data.then(o => console.log(o))
} else {
  console.log(data)
}
