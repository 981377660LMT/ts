// 特点：在程序的生命周期内只有一个全局的实例，并且不能再new出新的实例。
// 用处：在一些只需要一个对象存在的情况下，可以使用单例，比如Cache, ThreadPool等。
// 注意：线程安全，当然，这在单线程的JavaScript环境里是不存在的。

// 设置一个全局只读的Instance并且把构造函数设为private，这样就确保了单例的特点。
class Cache {
  static readonly instance: Cache = new Cache()
  private items: { [key: string]: string } = {}
  private constructor() {}

  set(key: string, value: string) {
    this.items[key] = value
    console.log(`set cache with key: '${key}', value: '${value}'`)
  }

  get(key: string): string {
    let value = this.items[key]
    console.log(`get cache value: '${value}' with key: '${key}'`)
    return value
  }
}

Cache.instance.set('name', 'brook')
Cache.instance.get('name')

export {}
