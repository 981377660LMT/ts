// register store
// 给store提供一个注册函数，使得注册后的store上能够识别已经注册的store的类型。

/**
 * @alias Chainable
 */
class Store<S = {}> {
  register<K extends string, V>(key: K extends keyof S ? never : K, value: V): Store<Omit<S, K> & Record<K, V>> {
    return Object.assign(this, { [key]: value }) as any
  }

  get(): S {
    return this as any
  }
}

const rootStore = new Store()
const userStore = { getUser: () => {} }
const orderStore = { getOrder: () => {} }

const res = rootStore.register('userStore', userStore).register('orderStore', orderStore).get()

export {}
