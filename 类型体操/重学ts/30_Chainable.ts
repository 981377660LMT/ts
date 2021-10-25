declare const config: Chainable

// type Chainable = {
//   option(key: string, value: any): any
//   get(): any
// }
type Chainable<R = {}> = {
  // Chainable<R & Record<K, V>>添加属性
  option<K extends PropertyKey, V>(key: K, value: V): Chainable<R & Record<K, V>>
  get(): R
}

// js 中的 return this 这种思路, 那么这里 option 的返回值就应该是一个新的 Chainable
const result = config
  .option('age', 7)
  .option('name', 'lolo')
  .option('address', { value: 'XiaMen' })
  .get()

type ResultType = typeof result
// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }

export {}
