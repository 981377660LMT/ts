// 需要一个工厂方法、一个标记是否为单例的属性以及指向单例的指针
interface IIOC {
  factory: Function
  singeton: boolean
  instance?: {}
}

type Constructor<T = {}> = new (...args: any[]) => T
//////////////////////////////////////////////////////////
class IOC {
  private container: Map<PropertyKey, IIOC>
  constructor() {
    this.container = new Map<PropertyKey, IIOC>()
  }

  // 模仿inversifyJS的bind...to...
  // inversifyJS将bind和to分开是为了更好的选择to单例还是to新的实例
  bind<T>(key: PropertyKey, Fn: Constructor<T>) {
    // 创造工厂里要从metadata取出@inject的依赖类，实例化各个完依赖类之后再创造工厂，此处省略细节。
    // 在注册信息时提供依赖模块键的列表，然后在实例化时通过递归的方式将依赖模块都映射为对应的实例,webpack模块加载原理时也会接触到类似的模式。
    const factory = () => new Fn()
    this.container.set(key, { factory, singeton: true })
  }

  get(key: PropertyKey) {
    const item = this.container.get(key)
    if (item !== undefined) {
      // 单例模式第一次获取还未实例化时
      if (item.singeton && !item.instance) {
        item.instance = item.factory()
      }
      return item.singeton ? item.instance : item.factory()
    } else {
      throw new Error('未找到构造方法')
    }
  }
}
///////////////////////////////////////////////////////////////////
class UserService {
  constructor() {}
  test(name: string) {
    console.log(name)
  }
}
//////////////////////////////////////////////////////////////////
const container = new IOC()
container.bind<UserService>('UserService', UserService)
const userService = container.get('UserService')
userService.test('cmnx')
