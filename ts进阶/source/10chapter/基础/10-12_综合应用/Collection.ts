// 1 集合类
class Collection<T = any> {
  private static collection: Collection
  public static getInstance() {
    if (!this.collection) {
      this.collection = new Collection()
    }
    return this.collection
  }
  private containerMap = new Map<string | symbol, any>()

  private constructor() {
    console.log('构造。。。。')
  }

  public static test() {
    console.log('test....')
  }

  public set(id: string | symbol, value: T): void {
    this.containerMap.set(id, value)
  }

  public get(id: string | symbol): T {
    return this.containerMap.get(id)
  }

  public has(id: string | symbol): Boolean {
    return this.containerMap.has(id)
  }
}

export default Collection.getInstance()
